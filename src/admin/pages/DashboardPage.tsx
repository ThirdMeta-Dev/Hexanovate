import { useEffect, useState } from "react";
import { Link } from "react-router";
import { AdminLayout } from "../components/AdminLayout";
import { supabase } from "@/lib/supabase";
import type { CmsPage } from "@/lib/cms-types";
import { ChevronRight, FileText, ToggleLeft, ToggleRight } from "lucide-react";

const PAGE_ICONS: Record<string, string> = {
  home: "🏠",
  "about-us": "👥",
  "leadership-and-team": "👔",
  "schedule-demo": "📅",
  "contact-us": "✉️",
  "thank-you": "🙏",
};

export default function DashboardPage() {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [sectionCounts, setSectionCounts] = useState<Record<string, { total: number; enabled: number }>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // noindex
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  useEffect(() => {
    async function load() {
      const { data: pagesData } = await supabase.from("cms_pages").select("*").order("name");
      if (!pagesData) { setLoading(false); return; }
      setPages(pagesData);

      const counts: Record<string, { total: number; enabled: number }> = {};
      for (const page of pagesData) {
        const { data: sections } = await supabase
          .from("cms_sections")
          .select("enabled")
          .eq("page_id", page.id);
        if (sections) {
          counts[page.id] = {
            total: sections.length,
            enabled: sections.filter(s => s.enabled).length,
          };
        }
      }
      setSectionCounts(counts);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <AdminLayout title="Pages">
      {loading ? (
        <div style={{ color: "#555", fontSize: 14 }}>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {pages.map(page => {
            const counts = sectionCounts[page.id];
            return (
              <Link
                key={page.id}
                to={`/admin/pages/${page.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  background: "#111",
                  border: "1px solid #1e1e1e",
                  borderRadius: 12,
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "#333")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "#1e1e1e")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 22 }}>{PAGE_ICONS[page.slug] ?? "📄"}</span>
                    <div>
                      <div style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>{page.name}</div>
                      <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>/{page.slug}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                    {counts && (
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, color: "#888" }}>
                          <span style={{ color: "#4ade80" }}>{counts.enabled}</span>
                          <span style={{ color: "#444" }}>/{counts.total}</span>
                          <span style={{ color: "#555", marginLeft: 4 }}>sections on</span>
                        </div>
                      </div>
                    )}
                    <ChevronRight size={16} color="#444" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AdminLayout>
  );
}
