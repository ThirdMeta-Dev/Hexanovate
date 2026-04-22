import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { CmsSection, CmsCarouselItem } from "@/lib/cms-types";

interface UseCmsSectionResult {
  section: CmsSection | null;
  content: Record<string, unknown>;
  items: CmsCarouselItem[];
  enabled: boolean;
  loading: boolean;
}

const cache = new Map<string, CmsSection | null>();
const itemCache = new Map<string, CmsCarouselItem[]>();

export function useCmsSection(
  componentName: string,
  pageSlug: string
): UseCmsSectionResult {
  const cacheKey = `${pageSlug}:${componentName}`;
  const [section, setSection] = useState<CmsSection | null>(
    cache.get(cacheKey) ?? null
  );
  const [items, setItems] = useState<CmsCarouselItem[]>(
    itemCache.get(cacheKey) ?? []
  );
  const [loading, setLoading] = useState(!cache.has(cacheKey));

  useEffect(() => {
    if (cache.has(cacheKey)) return;

    let cancelled = false;

    async function load() {
      const { data: pages } = await supabase
        .from("cms_pages")
        .select("id")
        .eq("slug", pageSlug)
        .single();

      if (!pages || cancelled) {
        setLoading(false);
        return;
      }

      const { data: sec } = await supabase
        .from("cms_sections")
        .select("*")
        .eq("page_id", pages.id)
        .eq("component_name", componentName)
        .single();

      if (cancelled) return;
      cache.set(cacheKey, sec ?? null);
      setSection(sec ?? null);

      if (sec) {
        const { data: carouselItems } = await supabase
          .from("cms_carousel_items")
          .select("*")
          .eq("section_id", sec.id)
          .order("item_order");

        if (!cancelled && carouselItems) {
          itemCache.set(cacheKey, carouselItems);
          setItems(carouselItems);
        }
      }

      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [cacheKey, componentName, pageSlug]);

  return {
    section,
    content: (section?.content ?? {}) as Record<string, unknown>,
    items,
    enabled: section ? section.enabled : true,
    loading,
  };
}

export function useCmsSectionEnabled(
  componentName: string,
  pageSlug: string
): boolean {
  const { enabled } = useCmsSection(componentName, pageSlug);
  return enabled;
}
