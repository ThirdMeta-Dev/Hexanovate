import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router";
import { AdminLayout } from "../components/AdminLayout";
import { supabase } from "@/lib/supabase";
import type { CmsPage, CmsSection } from "@/lib/cms-types";
import { ChevronRight, ToggleLeft, ToggleRight, Edit3 } from "lucide-react";

function SectionRow({
  section,
  onToggle,
}: {
  section: CmsSection;
  onToggle: (id: string, enabled: boolean) => void;
}) {
  const [saving, setSaving] = useState(false);

  async function toggle() {
    setSaving(true);
    const { error } = await supabase
      .from("cms_sections")
      .update({ enabled: !section.enabled })
      .eq("id", section.id);
    if (!error) onToggle(section.id, !section.enabled);
    setSaving(false);
  }

  return (
    <div style={{
      background: "#111",
      border: "1px solid #1e1e1e",
      borderRadius: 10,
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      opacity: section.enabled ? 1 : 0.5,
    }}>
      {/* Drag handle */}
      <div style={{ color: "#333", cursor: "grab", fontSize: 16, lineHeight: 1, userSelect: "none" }}>⠿</div>

      {/* Toggle */}
      <button
        onClick={toggle}
        disabled={saving}
        style={{ background: "none", border: "none", cursor: saving ? "wait" : "pointer", padding: 0, flexShrink: 0 }}
        title={section.enabled ? "Disable section" : "Enable section"}
      >
        {section.enabled
          ? <ToggleRight size={28} color="#4ade80" />
          : <ToggleLeft size={28} color="#444" />}
      </button>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{section.display_name}</div>
        <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>{section.component_name}</div>
      </div>

      {/* Edit link */}
      <Link
        to={`${section.id}`}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          textDecoration: "none", color: "#888", fontSize: 13,
          padding: "6px 12px", borderRadius: 6, border: "1px solid #2a2a2a",
        }}
      >
        <Edit3 size={13} />
        Edit Content
        <ChevronRight size={13} />
      </Link>
    </div>
  );
}

export default function PageEditorPage() {
  const { pageSlug } = useParams<{ pageSlug: string }>();
  const [page, setPage] = useState<CmsPage | null>(null);
  const [sections, setSections] = useState<CmsSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  useEffect(() => {
    async function load() {
      const { data: pageData } = await supabase
        .from("cms_pages")
        .select("*")
        .eq("slug", pageSlug)
        .single();

      if (!pageData) { setLoading(false); return; }
      setPage(pageData);

      const { data: sectionsData } = await supabase
        .from("cms_sections")
        .select("*")
        .eq("page_id", pageData.id)
        .order("display_order");

      if (sectionsData) setSections(sectionsData);
      setLoading(false);
    }
    load();
  }, [pageSlug]);

  const handleToggle = useCallback((id: string, enabled: boolean) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, enabled } : s));
  }, []);

  const enabledCount = sections.filter(s => s.enabled).length;

  return (
    <AdminLayout
      title={page?.name ?? pageSlug ?? "Page"}
      backLink={{ href: "/admin", label: "All Pages" }}
    >
      {loading ? (
        <div style={{ color: "#555", fontSize: 14 }}>Loading...</div>
      ) : (
        <>
          {/* Stats bar */}
          <div style={{
            background: "#111", border: "1px solid #1e1e1e", borderRadius: 10,
            padding: "14px 18px", marginBottom: 20, display: "flex",
            alignItems: "center", justifyContent: "space-between",
          }}>
            <span style={{ color: "#888", fontSize: 13 }}>
              Page: <code style={{ color: "#FFA600", fontSize: 12, background: "#1a1100", padding: "2px 6px", borderRadius: 4 }}>/{pageSlug}</code>
            </span>
            <span style={{ color: "#888", fontSize: 13 }}>
              <span style={{ color: "#4ade80", fontWeight: 600 }}>{enabledCount}</span>
              <span style={{ color: "#444" }}>/{sections.length}</span>
              {" "}sections visible
            </span>
          </div>

          {/* Quick actions */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <button
              onClick={async () => {
                for (const s of sections) {
                  await supabase.from("cms_sections").update({ enabled: true }).eq("id", s.id);
                }
                setSections(prev => prev.map(s => ({ ...s, enabled: true })));
              }}
              style={{
                background: "none", border: "1px solid #2a2a2a", color: "#888",
                padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer",
              }}
            >
              Enable All
            </button>
            <button
              onClick={async () => {
                for (const s of sections) {
                  await supabase.from("cms_sections").update({ enabled: false }).eq("id", s.id);
                }
                setSections(prev => prev.map(s => ({ ...s, enabled: false })));
              }}
              style={{
                background: "none", border: "1px solid #2a2a2a", color: "#888",
                padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer",
              }}
            >
              Disable All
            </button>
          </div>

          {/* Section list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {sections.map(section => (
              <SectionRow key={section.id} section={section} onToggle={handleToggle} />
            ))}
          </div>
        </>
      )}
    </AdminLayout>
  );
}
