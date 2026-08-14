import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import { PAGES } from "@/lib/cms-seed-data";
import { SECTION_SCHEMAS } from "@/lib/cms-schemas";
import type { CmsSection, CmsCarouselItem, ContentField } from "@/lib/cms-types";
import {
  ToggleLeft, ToggleRight, ChevronDown, ChevronRight,
  LogOut, Globe, LayoutDashboard, Save, Check, Plus, Trash2,
  GripVertical, Image as ImageIcon, Navigation, Settings,
  FileText, Film, FolderOpen,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { MediaPanel } from "./panels/MediaPanel";
import { MenuPanel } from "./panels/MenuPanel";
import { SettingsPanel } from "./panels/SettingsPanel";
import { MediaPicker } from "./components/MediaPicker";

/* ─── Colours ───────────────────────────────────────────────────────────────── */
const C = {
  bg: "#0a0a0a",
  sidebar: "#0d0d0d",
  sidebarBorder: "#1a1a1a",
  panel: "#111",
  panelBorder: "#1e1e1e",
  accent: "#FFA600",
  accentDim: "#1a1100",
  text: "#fff",
  muted: "#888",
  dim: "#444",
  green: "#4ade80",
  red: "#ff6b6b",
};

type ActiveView = "dashboard" | "section" | "media" | "menus" | "settings";

/* ─── Field Editor ─────────────────────────────────────────────────────────── */
function FieldEditor({ field, value, onChange }: { field: ContentField; value: string; onChange: (v: string) => void }) {
  const [pickerOpen, setPickerOpen] = useState(false);

  const base: React.CSSProperties = {
    width: "100%", padding: "9px 12px", background: C.bg, border: `1px solid #2a2a2a`,
    borderRadius: 7, color: C.text, fontSize: 13, outline: "none",
    boxSizing: "border-box", fontFamily: "system-ui, sans-serif",
  };

  /* ── Image field ── */
  if (field.type === "image") {
    return (
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {field.label}
        </label>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          {/* Thumbnail */}
          <div
            onClick={() => setPickerOpen(true)}
            style={{ width: 96, height: 72, background: "#0d0d0d", border: `1px solid #2a2a2a`, borderRadius: 8, flexShrink: 0, overflow: "hidden", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
            title="Click to choose image"
          >
            {value
              ? <img src={value} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              : <ImageIcon size={24} color="#333" />
            }
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
            >
              <FolderOpen size={18} color="#fff" />
            </div>
          </div>
          {/* URL + buttons */}
          <div style={{ flex: 1 }}>
            <button
              onClick={() => setPickerOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: 6, background: C.accentDim, border: `1px solid ${C.accent}44`, color: C.accent, borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", marginBottom: 6 }}
            >
              <FolderOpen size={12} />{value ? "Change Image" : "Choose Image"}
            </button>
            <input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              placeholder="or paste image URL"
              style={{ ...base, fontSize: 11, color: "#888", padding: "6px 10px" }}
            />
          </div>
        </div>
        {pickerOpen && <MediaPicker accept="image" onSelect={url => { onChange(url); setPickerOpen(false); }} onClose={() => setPickerOpen(false)} />}
      </div>
    );
  }

  /* ── Video field ── */
  if (field.type === "video") {
    return (
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: "block", color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {field.label}
        </label>
        {/* Video preview if URL exists */}
        {value && (
          <div style={{ width: "100%", maxWidth: 280, marginBottom: 8, background: "#0d0d0d", borderRadius: 8, overflow: "hidden", border: "1px solid #2a2a2a" }}>
            <video src={value} controls style={{ width: "100%", maxHeight: 120, display: "block" }} />
          </div>
        )}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
          <button
            onClick={() => setPickerOpen(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, background: C.accentDim, border: `1px solid ${C.accent}44`, color: C.accent, borderRadius: 6, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
          >
            <Film size={13} />{value ? "Change Video" : "Upload / Choose Video"}
          </button>
          {value && (
            <button
              onClick={() => onChange("")}
              style={{ background: "none", border: "1px solid #2a2a2a", color: C.muted, borderRadius: 6, padding: "7px 10px", fontSize: 11, cursor: "pointer" }}
            >
              Remove
            </button>
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="or paste video URL (.mp4, .webm…)"
          style={{ ...base, fontSize: 11, color: "#888", padding: "6px 10px" }}
        />
        {pickerOpen && <MediaPicker accept="video" onSelect={url => { onChange(url); setPickerOpen(false); }} onClose={() => setPickerOpen(false)} />}
      </div>
    );
  }

  /* ── Default: text / textarea / url / richtext / number ── */
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", color: C.muted, fontSize: 11, fontWeight: 600, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {field.label}
      </label>
      {field.type === "textarea" || field.type === "richtext"
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={{ ...base, resize: "vertical", lineHeight: 1.6 }} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={field.placeholder ?? (field.type === "url" ? "https://" : "")} style={base} />
      }
    </div>
  );
}

/* ─── Carousel Item Card ───────────────────────────────────────────────────── */
function CarouselCard({ item, itemFields, index, onSave, onDelete }: {
  item: CmsCarouselItem; itemFields: ContentField[]; index: number;
  onSave: (id: string, content: Record<string, unknown>) => Promise<void>;
  onDelete: (id: string) => void;
}) {
  const [content, setContent] = useState<Record<string, unknown>>({ ...item.content });
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function change(key: string, val: string) { setContent(p => ({ ...p, [key]: val })); setDirty(true); setSaved(false); }

  async function save() {
    setSaving(true);
    await onSave(item.id, content);
    setDirty(false); setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ background: C.bg, border: `1px solid #1e1e1e`, borderRadius: 8, padding: 14, marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <GripVertical size={13} color="#333" />
          <span style={{ color: "#555", fontSize: 11, fontWeight: 700 }}>ITEM {index + 1}</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {saved && <span style={{ color: C.green, fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}><Check size={11} />Saved</span>}
          {dirty && (
            <button onClick={save} disabled={saving} style={{ display: "flex", alignItems: "center", gap: 4, background: saving ? "#1a1a1a" : C.accent, color: saving ? "#666" : "#000", border: "none", borderRadius: 5, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: saving ? "wait" : "pointer" }}>
              <Save size={11} />{saving ? "..." : "Save"}
            </button>
          )}
          <button onClick={() => onDelete(item.id)} style={{ background: "none", border: "none", color: C.red, cursor: "pointer", padding: 4 }}>
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      {itemFields.map(f => (
        <FieldEditor key={f.key} field={f} value={String(content[f.key] ?? "")} onChange={v => change(f.key, v)} />
      ))}
    </div>
  );
}

/* ─── Section Editor Panel ─────────────────────────────────────────────────── */
function SectionEditorPanel({ section, onToggle }: { section: CmsSection; onToggle: (id: string, enabled: boolean) => void }) {
  const schema = SECTION_SCHEMAS[section.component_name];
  const defaultContent = schema?.defaultContent ?? {};
  const merged = { ...defaultContent, ...section.content };

  const [content, setContent] = useState<Record<string, unknown>>(merged);
  const [items, setItems] = useState<CmsCarouselItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    setContent({ ...defaultContent, ...section.content });
    setDirty(false); setSaved(false);
  }, [section.id]);

  useEffect(() => {
    if (!schema?.isCarousel) { setLoadingItems(false); return; }
    setLoadingItems(true);
    supabase.from("cms_carousel_items").select("*").eq("section_id", section.id).order("item_order")
      .then(({ data }) => {
        if (data && data.length === 0 && schema.defaultItems?.length) {
          const inserts = (schema.defaultItems ?? []).map((c, i) => ({ section_id: section.id, item_order: i, content: c }));
          supabase.from("cms_carousel_items").insert(inserts).select()
            .then(({ data: seeded }) => { setItems(seeded ?? []); setLoadingItems(false); });
        } else {
          setItems(data ?? []); setLoadingItems(false);
        }
      });
  }, [section.id]);

  function change(key: string, val: string) { setContent(p => ({ ...p, [key]: val })); setDirty(true); setSaved(false); }

  async function saveContent() {
    setSaving(true);
    await supabase.from("cms_sections").update({ content }).eq("id", section.id);
    setDirty(false); setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function toggle() {
    setToggling(true);
    const newEnabled = !section.enabled;
    await supabase.from("cms_sections").update({ enabled: newEnabled }).eq("id", section.id);
    onToggle(section.id, newEnabled);
    setToggling(false);
  }

  async function addItem() {
    const { data } = await supabase.from("cms_carousel_items")
      .insert({ section_id: section.id, item_order: items.length, content: {} }).select().single();
    if (data) setItems(p => [...p, data]);
  }

  async function saveItem(id: string, c: Record<string, unknown>) {
    await supabase.from("cms_carousel_items").update({ content: c }).eq("id", id);
    setItems(p => p.map(i => i.id === id ? { ...i, content: c } : i));
  }

  async function deleteItem(id: string) {
    await supabase.from("cms_carousel_items").delete().eq("id", id);
    setItems(p => p.filter(i => i.id !== id));
  }

  if (!schema) {
    return (
      <div style={{ padding: 32, color: C.muted, fontSize: 14 }}>
        No editable schema defined for <code style={{ color: C.accent }}>{section.component_name}</code> yet.
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 32px", overflowY: "auto", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.text }}>{section.display_name}</h2>
          <code style={{ color: C.accent, fontSize: 11, background: C.accentDim, padding: "2px 8px", borderRadius: 4, marginTop: 4, display: "inline-block" }}>
            {section.component_name}
          </code>
        </div>
        <button onClick={toggle} disabled={toggling} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: `1px solid #2a2a2a`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: C.muted, fontSize: 13 }}>
          {section.enabled ? <ToggleRight size={20} color={C.green} /> : <ToggleLeft size={20} color="#444" />}
          <span style={{ color: section.enabled ? C.green : "#555" }}>{section.enabled ? "Visible on site" : "Hidden from site"}</span>
        </button>
      </div>

      {schema.fields.length > 0 && (
        <div style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.text }}>Content</h3>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              {saved && !dirty && <span style={{ color: C.green, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><Check size={12} />Saved</span>}
              <button onClick={saveContent} disabled={!dirty || saving} style={{ display: "flex", alignItems: "center", gap: 6, background: dirty ? C.accent : "#1a1a1a", color: dirty ? "#000" : "#444", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: dirty ? "pointer" : "default" }}>
                <Save size={13} />{saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
          {schema.fields.map(f => (
            <FieldEditor key={f.key} field={f} value={String(content[f.key] ?? "")} onChange={v => change(f.key, v)} />
          ))}
        </div>
      )}

      {schema.isCarousel && (
        <div style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.text }}>
              {schema.carouselLabel ?? "Items"}
              <span style={{ color: "#555", fontWeight: 400, marginLeft: 8 }}>({items.length})</span>
            </h3>
            <button onClick={addItem} style={{ display: "flex", alignItems: "center", gap: 5, background: C.accentDim, border: `1px solid ${C.accent}`, color: C.accent, borderRadius: 7, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              <Plus size={13} />Add Item
            </button>
          </div>
          {loadingItems && <div style={{ color: "#555", fontSize: 13 }}>Loading...</div>}
          {!loadingItems && items.length === 0 && (
            <div style={{ color: "#444", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No items yet. Click "Add Item".</div>
          )}
          {items.map((item, i) => (
            <CarouselCard key={item.id} item={item} itemFields={schema.itemFields ?? []} index={i} onSave={saveItem} onDelete={deleteItem} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Sidebar Section Row ──────────────────────────────────────────────────── */
function SidebarSectionRow({ section, isActive, onSelect, onToggle }: {
  section: CmsSection; isActive: boolean;
  onSelect: () => void; onToggle: (id: string, enabled: boolean) => void;
}) {
  const [toggling, setToggling] = useState(false);

  async function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    setToggling(true);
    const newEnabled = !section.enabled;
    await supabase.from("cms_sections").update({ enabled: newEnabled }).eq("id", section.id);
    onToggle(section.id, newEnabled);
    setToggling(false);
  }

  return (
    <div
      onClick={onSelect}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "6px 10px 6px 28px", cursor: "pointer", borderRadius: 6, marginBottom: 1,
        background: isActive ? "#1a1100" : "transparent",
        borderLeft: isActive ? `2px solid ${C.accent}` : "2px solid transparent",
        transition: "background 0.1s",
      }}
      onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#141414"; }}
      onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 7, overflow: "hidden", flex: 1 }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: section.enabled ? C.green : "#333", flexShrink: 0 }} />
        <span style={{ color: isActive ? C.accent : (section.enabled ? "#bbb" : "#555"), fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {section.display_name}
        </span>
      </div>
      <button
        onClick={toggle}
        disabled={toggling}
        style={{ background: "none", border: "none", cursor: toggling ? "wait" : "pointer", padding: 2, flexShrink: 0, opacity: toggling ? 0.5 : 1 }}
        title={section.enabled ? "Hide section" : "Show section"}
      >
        {section.enabled ? <ToggleRight size={14} color={C.green} /> : <ToggleLeft size={14} color="#444" />}
      </button>
    </div>
  );
}

/* ─── Page Group in Sidebar ────────────────────────────────────────────────── */
function SidebarPageGroup({ page, sections, selectedSectionId, onSelect, onToggleSection }: {
  page: { slug: string; name: string }; sections: CmsSection[];
  selectedSectionId: string | null;
  onSelect: (s: CmsSection) => void; onToggleSection: (id: string, enabled: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const enabledCount = sections.filter(s => s.enabled).length;
  const hasActive = sections.some(s => s.id === selectedSectionId);

  useEffect(() => { if (hasActive) setOpen(true); }, [hasActive]);

  return (
    <div style={{ marginBottom: 2 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "6px 10px 6px 16px", borderRadius: 6,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#141414")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          {open ? <ChevronDown size={12} color="#555" /> : <ChevronRight size={12} color="#555" />}
          <span style={{ color: "#aaa", fontSize: 12.5, fontWeight: 600 }}>{page.name}</span>
        </div>
        <span style={{ color: enabledCount > 0 ? "#555" : "#333", fontSize: 10, background: "#151515", padding: "1px 6px", borderRadius: 10 }}>
          {enabledCount}/{sections.length}
        </span>
      </button>
      {open && (
        <div>
          {sections.map(section => (
            <SidebarSectionRow
              key={section.id}
              section={section}
              isActive={selectedSectionId === section.id}
              onSelect={() => onSelect(section)}
              onToggle={onToggleSection}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Sidebar Nav Item ─────────────────────────────────────────────────────── */
function SidebarNavItem({ icon, label, active, onClick, badge }: {
  icon: React.ReactNode; label: string; active: boolean;
  onClick: () => void; badge?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", background: active ? "#1a1100" : "none",
        border: "none", borderLeft: active ? `2px solid ${C.accent}` : "2px solid transparent",
        borderRadius: 6, padding: "8px 12px",
        color: active ? C.accent : C.muted, fontSize: 13, cursor: "pointer",
        marginBottom: 2, fontFamily: "system-ui, sans-serif",
        transition: "background 0.1s",
      }}
      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "#141414"; }}
      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        {icon}
        {label}
      </div>
      {badge && <span style={{ fontSize: 10, color: "#444" }}>{badge}</span>}
    </button>
  );
}

/* ─── Sidebar Section Label ────────────────────────────────────────────────── */
function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ color: "#2e2e2e", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "10px 14px 4px" }}>
      {children}
    </div>
  );
}

/* ─── Dashboard View ───────────────────────────────────────────────────────── */
function DashboardView({ allSections, onGoMedia, onGoMenus, onGoSettings }: {
  allSections: Record<string, CmsSection[]>;
  onGoMedia: () => void; onGoMenus: () => void; onGoSettings: () => void;
}) {
  const PAGE_EMOJI: Record<string, string> = {
    home: "🏠", "about-us": "👥", "leadership-and-team": "👔",
    "schedule-demo": "📅", "contact-us": "✉️", "thank-you": "🙏",
  };
  const totalSections = Object.values(allSections).flat().length;
  const totalEnabled = Object.values(allSections).flat().filter(s => s.enabled).length;

  return (
    <div style={{ padding: "32px 40px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 4px" }}>Dashboard</h1>
      <p style={{ color: C.muted, fontSize: 14, margin: "0 0 28px" }}>
        {totalEnabled}/{totalSections} sections visible across {PAGES.length} pages.
      </p>

      {/* Page cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 12, marginBottom: 24 }}>
        {PAGES.map(page => {
          const sections = allSections[page.slug] ?? [];
          const enabled = sections.filter(s => s.enabled).length;
          return (
            <div key={page.slug} style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{PAGE_EMOJI[page.slug] ?? "📄"}</div>
              <div style={{ color: C.text, fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{page.name}</div>
              <div style={{ color: C.muted, fontSize: 12 }}>
                <span style={{ color: C.green }}>{enabled}</span>/{sections.length} sections visible
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick access */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Media Library", desc: "Upload & manage images", icon: <ImageIcon size={20} color={C.accent} />, action: onGoMedia },
          { label: "Navigation Menus", desc: "Edit site nav links", icon: <Navigation size={20} color={C.accent} />, action: onGoMenus },
          { label: "General Settings", desc: "Site-wide configuration", icon: <Settings size={20} color={C.accent} />, action: onGoSettings },
        ].map(card => (
          <button
            key={card.label}
            onClick={card.action}
            style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: "20px 18px", cursor: "pointer", textAlign: "left", fontFamily: "system-ui, sans-serif" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = C.accent + "55")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = C.panelBorder)}
          >
            <div style={{ marginBottom: 10 }}>{card.icon}</div>
            <div style={{ color: C.text, fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{card.label}</div>
            <div style={{ color: C.muted, fontSize: 12 }}>{card.desc}</div>
          </button>
        ))}
      </div>

      <div style={{ padding: 20, background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 10 }}>Quick Tips</div>
        <ul style={{ color: C.muted, fontSize: 13, margin: 0, paddingLeft: 20, lineHeight: 2 }}>
          <li>Click any section name in the sidebar to edit its content</li>
          <li>Toggle the switch next to any section to show/hide it instantly</li>
          <li>Green dot = visible · Grey dot = hidden</li>
          <li>Upload images via Media Library, then copy the URL into image fields</li>
        </ul>
      </div>
    </div>
  );
}

/* ─── Main Admin App ───────────────────────────────────────────────────────── */
export default function AdminApp() {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [allSections, setAllSections] = useState<Record<string, CmsSection[]>>({});
  const [selectedSection, setSelectedSection] = useState<CmsSection | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>("dashboard");
  const [loading, setLoading] = useState(true);
  const [pagesOpen, setPagesOpen] = useState(true);

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === null) navigate("/admin/login");
  }, [session, navigate]);

  // noindex
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots"; meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  // Load all sections
  useEffect(() => {
    if (!session) return;
    async function load() {
      const { data: pages } = await supabase.from("cms_pages").select("*");
      if (!pages) { setLoading(false); return; }
      const bySlug: Record<string, CmsSection[]> = {};
      for (const page of pages) {
        const { data: sections } = await supabase
          .from("cms_sections").select("*").eq("page_id", page.id).order("display_order");
        bySlug[page.slug] = sections ?? [];
      }
      setAllSections(bySlug);
      setLoading(false);
    }
    load();
  }, [session]);

  const handleToggleSection = useCallback((id: string, enabled: boolean) => {
    setAllSections(prev => {
      const next = { ...prev };
      for (const slug of Object.keys(next)) {
        next[slug] = next[slug].map(s => s.id === id ? { ...s, enabled } : s);
      }
      return next;
    });
    setSelectedSection(prev => prev?.id === id ? { ...prev, enabled } : prev);
  }, []);

  function selectSection(s: CmsSection) {
    setSelectedSection(s);
    setActiveView("section");
  }

  function goTo(view: ActiveView) {
    setActiveView(view);
    if (view !== "section") setSelectedSection(null);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  if (session === undefined || loading) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#555", fontSize: 14 }}>Loading...</div>
      </div>
    );
  }

  const totalSections = Object.values(allSections).flat().length;

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside style={{
        width: 256, flexShrink: 0, background: C.sidebar,
        borderRight: `1px solid ${C.sidebarBorder}`,
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>
        {/* Logo */}
        <div style={{ padding: "14px 14px 12px", borderBottom: `1px solid ${C.sidebarBorder}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: C.accent, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 16, fontWeight: 900, color: "#000" }}>H</span>
            </div>
            <div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13.5 }}>ThirdMeta CMS</div>
              <div style={{ color: "#444", fontSize: 10.5 }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ padding: "10px 8px", flex: 1, overflowY: "auto" }}>

          {/* Dashboard */}
          <SidebarNavItem
            icon={<LayoutDashboard size={14} />}
            label="Dashboard"
            active={activeView === "dashboard"}
            onClick={() => goTo("dashboard")}
          />

          {/* ── CONTENT ── */}
          <SidebarLabel>Content</SidebarLabel>

          {/* Pages (collapsible group) */}
          <div style={{ marginBottom: 2 }}>
            <button
              onClick={() => setPagesOpen(o => !o)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", background: activeView === "section" ? "#0f0f0f" : "none",
                border: "none", borderLeft: activeView === "section" ? `2px solid #2a2a2a` : "2px solid transparent",
                borderRadius: 6, padding: "8px 12px",
                color: C.muted, fontSize: 13, cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#141414"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = activeView === "section" ? "#0f0f0f" : "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <FileText size={14} />
                Pages
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 10, color: "#333" }}>{totalSections}</span>
                {pagesOpen ? <ChevronDown size={12} color="#444" /> : <ChevronRight size={12} color="#444" />}
              </div>
            </button>

            {pagesOpen && (
              <div style={{ paddingLeft: 4, marginTop: 2 }}>
                {PAGES.map(page => (
                  <SidebarPageGroup
                    key={page.slug}
                    page={page}
                    sections={allSections[page.slug] ?? []}
                    selectedSectionId={selectedSection?.id ?? null}
                    onSelect={selectSection}
                    onToggleSection={handleToggleSection}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Media */}
          <SidebarNavItem
            icon={<ImageIcon size={14} />}
            label="Media"
            active={activeView === "media"}
            onClick={() => goTo("media")}
          />

          {/* Menus */}
          <SidebarNavItem
            icon={<Navigation size={14} />}
            label="Menus"
            active={activeView === "menus"}
            onClick={() => goTo("menus")}
          />

          {/* ── SYSTEM ── */}
          <SidebarLabel>System</SidebarLabel>

          {/* Settings */}
          <SidebarNavItem
            icon={<Settings size={14} />}
            label="Settings"
            active={activeView === "settings"}
            onClick={() => goTo("settings")}
          />
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 14px", borderTop: `1px solid ${C.sidebarBorder}`, display: "flex", gap: 8, flexShrink: 0 }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 5, color: C.muted, textDecoration: "none", fontSize: 12, padding: "6px 10px", borderRadius: 6, border: `1px solid #222`, flex: 1, justifyContent: "center" }}
          >
            <Globe size={12} />View Site
          </a>
          <button
            onClick={logout}
            style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: `1px solid #222`, color: C.muted, cursor: "pointer", padding: "6px 10px", borderRadius: 6, fontSize: 12 }}
            title="Log out"
          >
            <LogOut size={12} />
          </button>
        </div>
      </aside>

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {activeView === "dashboard" && (
          <DashboardView
            allSections={allSections}
            onGoMedia={() => goTo("media")}
            onGoMenus={() => goTo("menus")}
            onGoSettings={() => goTo("settings")}
          />
        )}
        {activeView === "section" && selectedSection && (
          <SectionEditorPanel
            key={selectedSection.id}
            section={selectedSection}
            onToggle={handleToggleSection}
          />
        )}
        {activeView === "media" && <MediaPanel />}
        {activeView === "menus" && <MenuPanel />}
        {activeView === "settings" && <SettingsPanel />}
      </main>
    </div>
  );
}
