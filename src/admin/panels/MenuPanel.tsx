import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Save, Check, GripVertical, ChevronRight, Copy, ExternalLink, AlertTriangle } from "lucide-react";

const C = {
  bg: "#0a0a0a", panel: "#111", panelBorder: "#1e1e1e",
  accent: "#FFA600", accentDim: "#1a1100",
  text: "#fff", muted: "#888", dim: "#444",
  green: "#4ade80", red: "#ff6b6b",
};

const MIGRATION_SQL = `-- Run this in your Supabase SQL Editor
-- Dashboard → SQL Editor → New query → paste → Run

CREATE TABLE IF NOT EXISTS cms_nav_items (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_name   TEXT        NOT NULL DEFAULT 'main',
  label       TEXT        NOT NULL,
  link        TEXT        NOT NULL DEFAULT '#',
  parent_id   UUID        REFERENCES cms_nav_items(id) ON DELETE CASCADE,
  item_order  INTEGER     NOT NULL DEFAULT 0,
  target      TEXT        NOT NULL DEFAULT '_self',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE cms_nav_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "nav_anon_select" ON cms_nav_items FOR SELECT USING (true);
CREATE POLICY "nav_auth_all"    ON cms_nav_items FOR ALL    USING (auth.role() = 'authenticated');

INSERT INTO cms_nav_items (menu_name, label, link, item_order, target) VALUES
  ('main', 'Solutions',    '#solutions',    0, '_self'),
  ('main', 'Case Studies', '#case-studies', 1, '_self'),
  ('main', 'Company',      '#company',      2, '_self'),
  ('main', 'Contact Us',   '/contact-us',   3, '_self'),
  ('main', 'Schedule Demo','/schedule-demo',4, '_self')
ON CONFLICT DO NOTHING;`;

interface NavItem {
  id: string;
  menu_name: string;
  label: string;
  link: string;
  parent_id: string | null;
  item_order: number;
  target: string;
}

function NavItemRow({ item, onSave, onDelete, allItems, onAddChild }: {
  item: NavItem;
  onSave: (id: string, data: Partial<NavItem>) => Promise<void>;
  onDelete: (id: string) => void;
  allItems: NavItem[];
  onAddChild: (parentId: string) => void;
}) {
  const [label, setLabel] = useState(item.label);
  const [link, setLink] = useState(item.link);
  const [target, setTarget] = useState(item.target);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const children = allItems.filter(i => i.parent_id === item.id);

  function change<T>(setter: (v: T) => void, v: T) { setter(v); setDirty(true); setSaved(false); }

  async function save() {
    setSaving(true);
    await onSave(item.id, { label, link, target });
    setDirty(false); setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputStyle: React.CSSProperties = {
    background: C.bg, border: "1px solid #2a2a2a", borderRadius: 6,
    color: C.text, fontSize: 12, padding: "7px 10px", outline: "none",
    fontFamily: "system-ui, sans-serif", boxSizing: "border-box" as const, width: "100%",
  };

  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 10, padding: "12px 14px" }}>
        {/* Row header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <GripVertical size={13} color="#333" style={{ flexShrink: 0 }} />
          {item.parent_id && <ChevronRight size={11} color="#555" style={{ flexShrink: 0 }} />}
          <span style={{ color: item.parent_id ? "#555" : "#888", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {item.parent_id ? "Submenu" : "Menu Item"}
          </span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
            {saved && <span style={{ color: C.green, fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}><Check size={11} />Saved</span>}
            {dirty && (
              <button onClick={save} disabled={saving}
                style={{ display: "flex", alignItems: "center", gap: 4, background: saving ? "#1a1a1a" : C.accent, color: saving ? "#666" : "#000", border: "none", borderRadius: 5, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: saving ? "wait" : "pointer" }}>
                <Save size={11} />{saving ? "…" : "Save"}
              </button>
            )}
            {!item.parent_id && (
              <button onClick={() => onAddChild(item.id)}
                title="Add submenu item"
                style={{ background: "none", border: "1px solid #2a2a2a", color: "#666", cursor: "pointer", padding: "3px 8px", borderRadius: 5, fontSize: 10 }}>
                + Sub
              </button>
            )}
            <button onClick={() => onDelete(item.id)}
              style={{ background: "none", border: "none", color: C.red, cursor: "pointer", padding: 4 }}>
              <Trash2 size={12} />
            </button>
          </div>
        </div>

        {/* Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 110px", gap: 8 }}>
          <div>
            <label style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: 3 }}>Label (display name)</label>
            <input value={label} onChange={e => change(setLabel, e.target.value)} style={inputStyle} placeholder="e.g. About Us" />
          </div>
          <div>
            <label style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: 3 }}>Link / URL</label>
            <input value={link} onChange={e => change(setLink, e.target.value)} style={inputStyle} placeholder="/page or https://…" />
          </div>
          <div>
            <label style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: 3 }}>Opens in</label>
            <select value={target} onChange={e => change(setTarget, e.target.value)}
              style={{ ...inputStyle, width: "100%", cursor: "pointer" }}>
              <option value="_self">Same tab</option>
              <option value="_blank">New tab</option>
            </select>
          </div>
        </div>

        {/* Children */}
        {children.length > 0 && (
          <div style={{ marginTop: 10, paddingLeft: 16, borderLeft: "2px solid #1a1a1a" }}>
            {children.map(child => (
              <NavItemRow key={child.id} item={child} onSave={onSave} onDelete={onDelete} allItems={allItems} onAddChild={onAddChild} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Nav Preview Bar ──────────────────────────────────────────────────────── */
function NavPreview({ items }: { items: NavItem[] }) {
  const topLevel = items.filter(i => !i.parent_id).sort((a, b) => a.item_order - b.item_order);

  return (
    <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 10, padding: "10px 16px", marginBottom: 20 }}>
      <div style={{ fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Live nav preview</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
        <span style={{ color: C.accent, fontWeight: 900, fontSize: 13, marginRight: 8 }}>H</span>
        {topLevel.map((item, i) => {
          const children = items.filter(c => c.parent_id === item.id);
          return (
            <div key={item.id} style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 4 }}>
              {i > 0 && <span style={{ color: "#2a2a2a", marginRight: 2 }}>|</span>}
              <span style={{ color: "#ccc", fontSize: 12, padding: "3px 6px", borderRadius: 4 }}>
                {item.label}
                {children.length > 0 && <span style={{ color: "#555", fontSize: 9, marginLeft: 3 }}>▾</span>}
              </span>
            </div>
          );
        })}
        {topLevel.length === 0 && <span style={{ color: "#333", fontSize: 12 }}>No items yet</span>}
      </div>
    </div>
  );
}

/* ─── Migration Error Panel ────────────────────────────────────────────────── */
function MigrationNeeded({ onRetry }: { onRetry: () => void }) {
  const [copied, setCopied] = useState(false);

  async function copySql() {
    await navigator.clipboard.writeText(MIGRATION_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  return (
    <div style={{ background: "#0f0800", border: "1px solid #3a2000", borderRadius: 12, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <AlertTriangle size={18} color={C.accent} />
        <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>Navigation table not set up yet</div>
      </div>
      <p style={{ color: C.muted, fontSize: 13, margin: "0 0 16px", lineHeight: 1.6 }}>
        The <code style={{ color: C.accent, background: "#1a0800", padding: "1px 6px", borderRadius: 3 }}>cms_nav_items</code> table doesn't exist in your Supabase database.
        Run this SQL in your Supabase dashboard to create it:
      </p>
      <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: 14, marginBottom: 14, fontFamily: "monospace", fontSize: 11, color: "#aaa", lineHeight: 1.7, whiteSpace: "pre", overflowX: "auto" }}>
        {MIGRATION_SQL}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={copySql}
          style={{ display: "flex", alignItems: "center", gap: 6, background: copied ? C.green : C.accent, color: "#000", border: "none", borderRadius: 7, padding: "9px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}
        >
          {copied ? <><Check size={13} />Copied!</> : <><Copy size={13} />Copy SQL</>}
        </button>
        <a
          href="https://supabase.com/dashboard/project/aovvrjsdsbzjlpbodasb/sql/new"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #2a2a2a", color: C.muted, borderRadius: 7, padding: "9px 18px", fontSize: 13, textDecoration: "none" }}
        >
          <ExternalLink size={13} />Open Supabase SQL Editor
        </a>
        <button
          onClick={onRetry}
          style={{ background: "none", border: "1px solid #2a2a2a", color: "#666", borderRadius: 7, padding: "9px 18px", fontSize: 13, cursor: "pointer" }}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

/* ─── Menu Panel ───────────────────────────────────────────────────────────── */
export function MenuPanel() {
  const [items, setItems] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tableError, setTableError] = useState(false);
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    setTableError(false);
    const { data, error: e } = await supabase.from("cms_nav_items").select("*").eq("menu_name", "main").order("item_order");
    if (e) {
      if (e.message?.includes("schema cache") || e.message?.includes("does not exist") || e.code === "PGRST204" || e.code === "42P01") {
        setTableError(true);
      }
      setLoading(false);
      return;
    }
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function addItem(parentId?: string) {
    setAdding(true);
    const siblings = items.filter(i => i.parent_id === (parentId ?? null));
    const maxOrder = siblings.reduce((m, i) => Math.max(m, i.item_order), -1);
    const { data, error: e } = await supabase.from("cms_nav_items").insert({
      menu_name: "main",
      label: "New Item",
      link: "/",
      parent_id: parentId ?? null,
      item_order: maxOrder + 1,
      target: "_self",
    }).select().single();
    if (e) { setAdding(false); return; }
    setItems(prev => [...prev, data]);
    setAdding(false);
  }

  async function saveItem(id: string, data: Partial<NavItem>) {
    await supabase.from("cms_nav_items").update(data).eq("id", id);
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...data } : i));
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this menu item and its submenus?")) return;
    await supabase.from("cms_nav_items").delete().eq("id", id);
    setItems(prev => prev.filter(i => i.id !== id && i.parent_id !== id));
  }

  const topLevel = items.filter(i => !i.parent_id).sort((a, b) => a.item_order - b.item_order);

  if (loading) {
    return <div style={{ padding: 60, color: "#444", textAlign: "center" }}>Loading…</div>;
  }

  return (
    <div style={{ padding: "32px 40px", minHeight: "100%", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>Navigation Menus</h1>
          <p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>
            Edit site navigation — changes reflect on the site after a page refresh
          </p>
        </div>
        {!tableError && (
          <button
            onClick={() => addItem()}
            disabled={adding}
            style={{ display: "flex", alignItems: "center", gap: 6, background: C.accent, color: "#000", border: "none", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: adding ? "wait" : "pointer" }}
          >
            <Plus size={14} />{adding ? "Adding…" : "Add Item"}
          </button>
        )}
      </div>

      {/* DB not set up */}
      {tableError && <MigrationNeeded onRetry={load} />}

      {!tableError && (
        <>
          {/* Nav preview */}
          <NavPreview items={items} />

          {/* Menu label strip */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ background: C.accentDim, border: `1px solid ${C.accent}33`, borderRadius: 6, padding: "4px 14px" }}>
              <span style={{ color: C.accent, fontSize: 12, fontWeight: 700 }}>Main Navigation</span>
            </div>
            <span style={{ color: "#333", fontSize: 12 }}>{topLevel.length} top-level item{topLevel.length !== 1 ? "s" : ""}</span>
          </div>

          {topLevel.length === 0 && (
            <div style={{ border: "2px dashed #1a1a1a", borderRadius: 10, padding: 40, textAlign: "center", color: "#444", fontSize: 13 }}>
              No menu items yet. Click "Add Item" to create the first one.
            </div>
          )}

          {topLevel.map(item => (
            <NavItemRow
              key={item.id}
              item={item}
              onSave={saveItem}
              onDelete={deleteItem}
              allItems={items}
              onAddChild={addItem}
            />
          ))}

          {topLevel.length > 0 && (
            <button
              onClick={() => addItem()}
              disabled={adding}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px dashed #2a2a2a", color: "#555", borderRadius: 7, padding: "8px 16px", fontSize: 12, cursor: "pointer", marginTop: 8, width: "100%" }}
            >
              <Plus size={12} />Add top-level item
            </button>
          )}

          {/* Tips */}
          <div style={{ marginTop: 24, background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 8, padding: "12px 16px" }}>
            <div style={{ fontSize: 11, color: "#444", lineHeight: 1.8 }}>
              <strong style={{ color: "#555" }}>Tips:</strong>{" "}
              Click <strong style={{ color: "#666" }}>+ Sub</strong> on any item to add a dropdown submenu.
              Items with submenus appear with a ▾ arrow in the nav.
              The order shown here is the order they appear on the site.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
