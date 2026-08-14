import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Check, Plus, Trash2, RefreshCw } from "lucide-react";

const C = {
  bg: "#0a0a0a", panel: "#111", panelBorder: "#1e1e1e",
  accent: "#FFA600", accentDim: "#1a1100",
  text: "#fff", muted: "#888", dim: "#444",
  green: "#4ade80", red: "#ff6b6b",
};

interface Setting { key: string; value: unknown; }

const PRESET_KEYS = [
  { key: "site_name", label: "Site Name", placeholder: "ThirdMeta" },
  { key: "site_tagline", label: "Tagline", placeholder: "Your tagline here" },
  { key: "contact_email", label: "Contact Email", placeholder: "hello@example.com" },
  { key: "contact_phone", label: "Contact Phone", placeholder: "+91 00000 00000" },
  { key: "linkedin_url", label: "LinkedIn URL", placeholder: "https://linkedin.com/company/..." },
  { key: "twitter_url", label: "Twitter / X URL", placeholder: "https://x.com/..." },
  { key: "instagram_url", label: "Instagram URL", placeholder: "https://instagram.com/..." },
  { key: "og_image_url", label: "Default OG Image URL", placeholder: "https://..." },
];

function SettingRow({ label, settingKey, value, onChange, onDelete, isPreset }: {
  label?: string; settingKey: string; value: string;
  onChange: (key: string, val: string) => void;
  onDelete?: (key: string) => void;
  isPreset?: boolean;
}) {
  const inputStyle: React.CSSProperties = {
    background: C.bg, border: "1px solid #2a2a2a", borderRadius: 6,
    color: C.text, fontSize: 13, padding: "8px 12px", outline: "none",
    fontFamily: "system-ui, sans-serif", boxSizing: "border-box", width: "100%",
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: isPreset ? "160px 1fr" : "160px 1fr 36px", gap: 10, marginBottom: 10, alignItems: "center" }}>
      <label style={{ fontSize: 11, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {label ?? settingKey}
      </label>
      <input
        value={value}
        onChange={e => onChange(settingKey, e.target.value)}
        style={inputStyle}
      />
      {!isPreset && onDelete && (
        <button onClick={() => onDelete(settingKey)} style={{ background: "none", border: "none", color: C.red, cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
          <Trash2 size={13} />
        </button>
      )}
    </div>
  );
}

export function SettingsPanel() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newVal, setNewVal] = useState("");
  const [addingCustom, setAddingCustom] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("cms_settings").select("*");
    const map: Record<string, string> = {};
    for (const row of data ?? []) {
      map[row.key] = typeof row.value === "string" ? row.value : JSON.stringify(row.value);
    }
    setSettings(map);
    setLoading(false);
    setDirty(false);
  }

  useEffect(() => { load(); }, []);

  function change(key: string, val: string) {
    setSettings(p => ({ ...p, [key]: val }));
    setDirty(true);
    setSaved(false);
  }

  async function save() {
    setSaving(true);
    const upserts: Setting[] = Object.entries(settings).map(([key, value]) => ({ key, value }));
    await supabase.from("cms_settings").upsert(upserts, { onConflict: "key" });
    setSaving(false);
    setSaved(true);
    setDirty(false);
    setTimeout(() => setSaved(false), 2500);
  }

  async function addCustom() {
    if (!newKey.trim()) return;
    const key = newKey.trim().replace(/\s+/g, "_").toLowerCase();
    await supabase.from("cms_settings").upsert([{ key, value: newVal }], { onConflict: "key" });
    setSettings(p => ({ ...p, [key]: newVal }));
    setNewKey(""); setNewVal("");
    setAddingCustom(false);
  }

  async function deleteKey(key: string) {
    if (!confirm(`Delete setting "${key}"?`)) return;
    await supabase.from("cms_settings").delete().eq("key", key);
    setSettings(p => { const n = { ...p }; delete n[key]; return n; });
  }

  const presetKeySet = new Set(PRESET_KEYS.map(p => p.key));
  const customKeys = Object.keys(settings).filter(k => !presetKeySet.has(k));

  const inputStyle: React.CSSProperties = {
    background: C.bg, border: "1px solid #2a2a2a", borderRadius: 6,
    color: C.text, fontSize: 13, padding: "8px 12px", outline: "none",
    fontFamily: "system-ui, sans-serif", boxSizing: "border-box",
  };

  return (
    <div style={{ padding: "32px 40px", minHeight: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>General Settings</h1>
          <p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>Site-wide configuration stored in cms_settings</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={load} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #2a2a2a", color: C.muted, cursor: "pointer", padding: "8px 14px", borderRadius: 7, fontSize: 13 }}>
            <RefreshCw size={13} />
          </button>
          {saved && !dirty && <span style={{ color: C.green, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><Check size={12} />Saved</span>}
          <button
            onClick={save}
            disabled={!dirty || saving}
            style={{ display: "flex", alignItems: "center", gap: 6, background: dirty ? C.accent : "#1a1a1a", color: dirty ? "#000" : "#444", border: "none", borderRadius: 7, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: dirty ? "pointer" : "default" }}
          >
            <Save size={13} />{saving ? "Saving…" : "Save All"}
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ color: "#444", padding: 40, textAlign: "center" }}>Loading…</div>
      ) : (
        <>
          {/* Preset fields */}
          <div style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>General</div>
            {PRESET_KEYS.map(p => (
              <SettingRow
                key={p.key}
                label={p.label}
                settingKey={p.key}
                value={settings[p.key] ?? ""}
                onChange={change}
                isPreset
              />
            ))}
          </div>

          {/* Custom keys */}
          {customKeys.length > 0 && (
            <div style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Custom Settings</div>
              {customKeys.map(k => (
                <SettingRow key={k} settingKey={k} value={settings[k] ?? ""} onChange={change} onDelete={deleteKey} />
              ))}
            </div>
          )}

          {/* Add custom setting */}
          <div style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#666", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>Add Custom Setting</div>
            {!addingCustom ? (
              <button
                onClick={() => setAddingCustom(true)}
                style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px dashed #2a2a2a", color: "#555", borderRadius: 7, padding: "8px 16px", fontSize: 12, cursor: "pointer" }}
              >
                <Plus size={12} />Add Key / Value Pair
              </button>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto auto", gap: 10, alignItems: "center" }}>
                <input
                  value={newKey}
                  onChange={e => setNewKey(e.target.value)}
                  placeholder="setting_key"
                  style={{ ...inputStyle }}
                />
                <input
                  value={newVal}
                  onChange={e => setNewVal(e.target.value)}
                  placeholder="value"
                  style={{ ...inputStyle }}
                />
                <button onClick={addCustom} style={{ background: C.accent, color: "#000", border: "none", borderRadius: 6, padding: "8px 14px", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                  Add
                </button>
                <button onClick={() => { setAddingCustom(false); setNewKey(""); setNewVal(""); }} style={{ background: "none", border: "1px solid #2a2a2a", color: C.muted, borderRadius: 6, padding: "8px 10px", fontSize: 12, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
