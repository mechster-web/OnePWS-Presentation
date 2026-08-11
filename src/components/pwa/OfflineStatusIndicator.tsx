import { CloudOff } from "lucide-react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

export function OfflineStatusIndicator() {
  const online = useOnlineStatus();

  if (online) {
    return null;
  }

  return (
    <div
      className="fixed left-4 top-4 z-[80] inline-flex min-h-9 items-center gap-2 border border-control-warm bg-control-warm px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-control-black backdrop-blur"
      role="status"
    >
      <CloudOff aria-hidden="true" size={15} />
      Offline mode
    </div>
  );
}
