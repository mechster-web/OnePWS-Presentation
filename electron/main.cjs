const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { app, BrowserWindow, Menu, net, protocol, shell } = require("electron");

const APP_ORIGIN = "app://onepws";

protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      stream: true,
    },
  },
]);

function resolveDistPath(url) {
  const distRoot = path.join(__dirname, "..", "dist");
  const requestUrl = new URL(url);
  const requestedPath = decodeURIComponent(requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname);
  const filePath = path.normalize(path.join(distRoot, requestedPath));

  if (!filePath.startsWith(distRoot)) {
    return path.join(distRoot, "index.html");
  }

  return filePath;
}

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1280,
    minHeight: 720,
    backgroundColor: "#ffffff",
    autoHideMenuBar: true,
    title: "OnePWS Control Room Presentation",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  mainWindow.maximize();
  await mainWindow.loadURL(APP_ORIGIN);
}

app.whenReady().then(async () => {
  Menu.setApplicationMenu(null);

  protocol.handle("app", (request) => {
    const filePath = resolveDistPath(request.url);
    return net.fetch(pathToFileURL(filePath).toString());
  });

  app.on("web-contents-created", (_event, contents) => {
    contents.setWindowOpenHandler(({ url }) => {
      void shell.openExternal(url);
      return { action: "deny" };
    });
  });

  await createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      void createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
