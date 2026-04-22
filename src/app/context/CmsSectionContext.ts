import { createContext, useContext } from "react";

interface CmsSectionContextValue {
  content: Record<string, unknown>;
  items: Record<string, unknown>[];
}

export const CmsSectionContext = createContext<CmsSectionContextValue>({
  content: {},
  items: [],
});

export function useCmsSectionContent() {
  return useContext(CmsSectionContext);
}
