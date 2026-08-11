import { getAsset } from "../../content/assetManifest";
import { openingAssets } from "./openingConfig";

export function preloadOpeningAssets() {
  [
    openingAssets.firstFrame,
    openingAssets.environment,
    openingAssets.detail,
    openingAssets.wide,
    openingAssets.brand,
  ].forEach((assetId) => {
    const asset = getAsset(assetId);
    if (!asset?.src || asset.type !== "image" && asset.type !== "logo") {
      return;
    }

    const image = new Image();
    image.decoding = "async";
    image.src = asset.src;
  });
}
