import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router";
import { AdminLayout } from "../components/AdminLayout";
import { supabase } from "@/lib/supabase";
import { SECTION_SCHEMAS } from "@/lib/cms-schemas";
import type { CmsSection, CmsCarouselItem, ContentField } from "@/lib/cms-types";
import { Plus, Trash2, GripVertical, Save, Check } from "lucide-react";

/* ─── Field Editor ─────────────────────────────────────────────────────────── */
function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: ContentField;
  value: string;
  onChange: (val: string) => void;
}) {
  const baseStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    background: "#0a0a0a",
    border: "1px solid #2a2a2a",
    borderRadius: 8,
    color: "#fff",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "system-ui, sans-serif",
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", color: "#888", fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {field.label}
      </label>
      {field.type === "textarea" || field.type === "richtext" ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          style={{ ...baseStyle, resize: "vertical", lineHeight: 1.6 }}
        />
      ) : (
        <input
          type={field.type === "url" || field.type === "image" ? "text" : "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={field.placeholder ?? (field.type === "url" ? "https://" : "")}
          style={baseStyle}
        />
      )}
      {field.type === "image" && value && (
        <img
          src={value}
          alt="preview"
          style={{ marginTop: 8, maxHeight: 80, borderRadius: 6, border: "1px solid #2a2a2a" }}
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      )}
    </div>
  );
}

/* ─── Carousel Item Card ───────────────────────────────────────────────────── */
function CarouselItemCard({
  item,
  itemFields,
  index,
  onUpdate,
  onDelete,
}: {
  item: CmsCarouselItem;
  itemFields: ContentField[];
  index: number;
  onUpdate: (id: string, content: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
}) {
  const [content, setContent] = useState<Record<string, unknown>>({ ...item.content });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(key: string, val: string) {
    setContent(prev => ({ ...prev, [key]: val }));
    setDirty(true);
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    await supabase.from("cms_carousel_items").update({ content }).eq("id", item.id);
    onUpdate(item.id, content);
    setDirty(false);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{
      background: "#0d0d0d",
      border: "1px solid #1e1e1e",
      borderRadius: 10,
      padding: 16,
      marginBottom: 8,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GripVertical size={14} color="#333" />
          <span style={{ color: "#555", fontSize: 12, fontWeight: 600 }}>Item {index + 1}</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {dirty && (
            <button
              onClick={save}
              disabled={saving}
              style={{
                display: "flex", alignItems: "center", gap: 5,
                background: saving ? "#222" : "#FFA600",
                color: saving ? "#666" : "#000",
                border: "none", borderRadius: 6,
                padding: "5px 12px", fontSize: 12, fontWeight: 600,
                cursor: saving ? "wait" : "pointer",
              }}
            >
              {saved ? <><Check size={12} /> Saved</> : <><Save size={12} /> {saving ? "Saving..." : "Save"}</>}
            </button>
          )}
          {saved && !dirty && (
            <span style={{ color: "#4ade80", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
              <Check size={12} /> Saved
            </span>
          )}
          <button
            onClick={() => onDelete(item.id)}
            style={{
              background: "none", border: "1px solid #2a0a0a",
              color: "#ff6b6b", borderRadius: 6, padding: "5px 10px",
              fontSize: 12, cursor: "pointer",
            }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {itemFields.map(field => (
        <FieldEditor
          key={field.key}
          field={field}
          value={String(content[field.key] ?? "")}
          onChange={val => handleChange(field.key, val)}
        />
      ))}
    </div>
  );
}

/* ─── Main Section Editor ──────────────────────────────────────────────────── */
export default function SectionEditorPage() {
  const { pageSlug, sectionId } = useParams<{ pageSlug: string; sectionId: string }>();
  const [section, setSection] = useState<CmsSection | null>(null);
  const [items, setItems] = useState<CmsCarouselItem[]>([]);
  const [content, setContent] = useState<Record<string, unknown>>({});
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
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
      const { data: sec } = await supabase
        .from("cms_sections")
        .select("*")
        .eq("id", sectionId)
        .single();

      if (sec) {
        setSection(sec);
        setContent(sec.content ?? {});

        const { data: carouselData } = await supabase
          .from("cms_carousel_items")
          .select("*")
          .eq("section_id", sec.id)
          .order("item_order");

        if (carouselData) setItems(carouselData);
      }
      setLoading(false);
    }
    load();
  }, [sectionId]);

  const schema = section ? SECTION_SCHEMAS[section.component_name] : null;

  function handleFieldChange(key: string, val: string) {
    setContent(prev => ({ ...prev, [key]: val }));
    setDirty(true);
    setSaved(false);
  }

  async function saveContent() {
    if (!section) return;
    setSaving(true);
    await supabase.from("cms_sections").update({ content }).eq("id", section.id);
    setDirty(false);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function addCarouselItem() {
    if (!section) return;
    const order = items.length;
    const { data } = await supabase
      .from("cms_carousel_items")
      .insert({ section_id: section.id, item_order: order, content: {} })
      .select()
      .single();
    if (data) setItems(prev => [...prev, data]);
  }

  async function deleteCarouselItem(id: string) {
    await supabase.from("cms_carousel_items").delete().eq("id", id);
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function updateCarouselItem(id: string, newContent: Record<string, unknown>) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, content: newContent } : i));
  }

  if (loading) {
    return (
      <AdminLayout title="Loading..." backLink={{ href: `/admin/pages/${pageSlug}`, label: "Back to Page" }}>
        <div style={{ color: "#555", fontSize: 14 }}>Loading section...</div>
      </AdminLayout>
    );
  }

  if (!section || !schema) {
    return (
      <AdminLayout title="Section" backLink={{ href: `/admin/pages/${pageSlug}`, label: "Back to Page" }}>
        <div style={{ color: "#888", fontSize: 14 }}>
          No editable content schema defined for <code style={{ color: "#FFA600" }}>{section?.component_name}</code> yet.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={section.display_name}
      backLink={{ href: `/admin/pages/${pageSlug}`, label: `← ${pageSlug}` }}
    >
      <div style={{ display: "flex", gap: 8, marginBottom: 24, alignItems: "center" }}>
        <code style={{ color: "#FFA600", fontSize: 12, background: "#1a1100", padding: "4px 10px", borderRadius: 6 }}>
          {section.component_name}
        </code>
        <span style={{
          fontSize: 11, padding: "3px 8px", borderRadius: 20,
          background: section.enabled ? "#0a1a0a" : "#1a0a0a",
          color: section.enabled ? "#4ade80" : "#ff6b6b",
          border: `1px solid ${section.enabled ? "#1a3a1a" : "#3a1a1a"}`,
        }}>
          {section.enabled ? "Visible" : "Hidden"}
        </span>
      </div>

      {/* Static content fields */}
      {schema.fields.length > 0 && (
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>Content</h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {saved && !dirty && (
                <span style={{ color: "#4ade80", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                  <Check size={12} /> Saved
                </span>
              )}
              <button
                onClick={saveContent}
                disabled={!dirty || saving}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: dirty ? "#FFA600" : "#1a1a1a",
                  color: dirty ? "#000" : "#444",
                  border: "none", borderRadius: 8,
                  padding: "8px 16px", fontSize: 13, fontWeight: 600,
                  cursor: dirty ? "pointer" : "default",
                }}
              >
                <Save size={14} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {schema.fields.map(field => (
            <FieldEditor
              key={field.key}
              field={field}
              value={String(content[field.key] ?? "")}
              onChange={val => handleFieldChange(field.key, val)}
            />
          ))}
        </div>
      )}

      {/* Carousel / list items */}
      {schema.isCarousel && (
        <div style={{ background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#fff" }}>
              {schema.carouselLabel ?? "Items"}
              <span style={{ color: "#555", fontWeight: 400, marginLeft: 8 }}>({items.length})</span>
            </h2>
            <button
              onClick={addCarouselItem}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#1a1100", border: "1px solid #FFA600",
                color: "#FFA600", borderRadius: 8,
                padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}
            >
              <Plus size={14} />
              Add Item
            </button>
          </div>

          {items.length === 0 && (
            <div style={{ color: "#444", fontSize: 13, textAlign: "center", padding: "24px 0" }}>
              No items yet. Click "Add Item" to get started.
            </div>
          )}

          {items.map((item, index) => (
            <CarouselItemCard
              key={item.id}
              item={item}
              itemFields={schema.itemFields ?? []}
              index={index}
              onUpdate={updateCarouselItem}
              onDelete={deleteCarouselItem}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
