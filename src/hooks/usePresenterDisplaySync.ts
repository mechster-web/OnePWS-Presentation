import { useEffect, useRef, type Dispatch } from "react";
import type { PresentationAction, PresentationState } from "../state/presentationReducer";

export type DisplayRole = "standard" | "presenter-console" | "customer-display";

const channelName = "onepws-presenter-display-sync";
const storageKey = "onepws-presenter-display-state";

type SyncMessage =
  | {
      type: "state";
      sourceId: string;
      state: PresentationState;
      sentAt: number;
    }
  | {
      type: "request-state";
      sourceId: string;
      sentAt: number;
    };

export function roleFromUrl(search = window.location.search): DisplayRole {
  const view = new URLSearchParams(search).get("view");
  if (view === "presenter-console" || view === "customer-display") {
    return view;
  }

  return "standard";
}

export function usePresenterDisplaySync(
  role: DisplayRole,
  state: PresentationState,
  dispatch: Dispatch<PresentationAction>,
) {
  const sourceIdRef = useRef(crypto.randomUUID());
  const channelRef = useRef<BroadcastChannel | null>(null);
  const lastRemoteStateRef = useRef<PresentationState | null>(null);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    if (role === "standard") {
      return undefined;
    }

    const channel = "BroadcastChannel" in window ? new BroadcastChannel(channelName) : null;
    channelRef.current = channel;

    function handleMessage(message: SyncMessage) {
      if (message.sourceId === sourceIdRef.current) {
        return;
      }

      if (role === "customer-display" && message.type === "state") {
        lastRemoteStateRef.current = message.state;
        dispatch({ type: "SYNC_REMOTE_STATE", state: message.state });
      }

      if (role === "presenter-console" && message.type === "request-state") {
        postState(stateRef.current);
      }
    }

    function handleStorage(event: StorageEvent) {
      if (role !== "customer-display" || event.key !== storageKey || !event.newValue) {
        return;
      }

      try {
        const message = JSON.parse(event.newValue) as SyncMessage;
        if (message.type === "state" && message.sourceId !== sourceIdRef.current) {
          lastRemoteStateRef.current = message.state;
          dispatch({ type: "SYNC_REMOTE_STATE", state: message.state });
        }
      } catch {
        // Ignore malformed sync payloads from old sessions.
      }
    }

    const handleChannelMessage = (event: MessageEvent<SyncMessage>) => handleMessage(event.data);

    channel?.addEventListener("message", handleChannelMessage);
    window.addEventListener("storage", handleStorage);

    if (role === "customer-display") {
      const request: SyncMessage = {
        type: "request-state",
        sourceId: sourceIdRef.current,
        sentAt: Date.now(),
      };
      channel?.postMessage(request);
    }

    return () => {
      channel?.close();
      channelRef.current = null;
      window.removeEventListener("storage", handleStorage);
    };
  }, [dispatch, role]);

  useEffect(() => {
    if (role !== "presenter-console") {
      return;
    }

    postState(state);
  }, [role, state]);

  function postState(nextState: PresentationState) {
    const message: SyncMessage = {
      type: "state",
      sourceId: sourceIdRef.current,
      state: nextState,
      sentAt: Date.now(),
    };

    channelRef.current?.postMessage(message);
    window.localStorage.setItem(storageKey, JSON.stringify(message));
  }

  return {
    connected: role === "presenter-console" || Boolean(lastRemoteStateRef.current),
  };
}
