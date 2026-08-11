import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  initialPresentationState,
  presentationReducer,
  type PresentationAction,
  type PresentationState,
} from "./presentationReducer";

type PresentationContextValue = {
  state: PresentationState;
  dispatch: Dispatch<PresentationAction>;
};

const PresentationContext = createContext<PresentationContextValue | null>(null);

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(presentationReducer, initialPresentationState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <PresentationContext.Provider value={value}>{children}</PresentationContext.Provider>;
}

export function usePresentation() {
  const context = useContext(PresentationContext);
  if (!context) {
    throw new Error("usePresentation must be used inside PresentationProvider");
  }
  return context;
}
