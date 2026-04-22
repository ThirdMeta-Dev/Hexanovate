import { useCmsSection } from "../hooks/useCmsSection";
import { CmsSectionContext } from "../context/CmsSectionContext";

interface CmsSectionProps {
  component: string;
  page: string;
  children: React.ReactNode;
}

export function CmsSection({ component, page, children }: CmsSectionProps) {
  const { enabled, loading, content, items } = useCmsSection(component, page);
  if (!loading && !enabled) return null;
  const contextItems = items.map(i => i.content as Record<string, unknown>);
  return (
    <CmsSectionContext.Provider value={{ content, items: contextItems }}>
      {children}
    </CmsSectionContext.Provider>
  );
}
