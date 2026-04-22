import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, X, Check, Image as ImageIcon, Film, Search } from "lucide-react";

const BUCKET = "cms-media";
const C = {
  bg: "#0a0a0a", panel: "#111", panelBorder: "#1e1e1e",
  overlay: "rgba(0,0,0,0.88)",
  accent: "#FFA600", text: "#fff", muted: "#888",
  green: "#4ade80", red: "#ff6b6b",
};

interface MediaFile {
  name: string;
  id: string;
  publicUrl: string;
  size?: number;
  created_at?: string;
}

const isImage = (name: string) => /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(name);
const isVideo = (name: string) => /\.(mp4|webm|mov|avi|mkv|ogv)$/i.test(name);

function formatBytes(b?: number) {
  if (!b) return "";
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

interface Props {
  accept?: "image" | "video" | "all";
  onSelect: (url: string) => void;
  onClose: () => void;
}

export function MediaPicker({ accept = "all", onSelect, onClose }: Props) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.storage.from(BUCKET).list("", {
      limit: 500, sortBy: { column: "created_at", order: "desc" },
    });
    const mapped: MediaFile[] = (data ?? [])
      .filter(f => f.name !== ".emptyFolderPlaceholder")
      .map(f => ({
        name: f.name,
        id: f.id ?? f.name,
        publicUrl: supabase.storage.from(BUCKET).getPublicUrl(f.name).data.publicUrl,
        size: f.metadata?.size,
        created_at: f.created_at,
      }));
    setFiles(mapped);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    let done = 0;
    for (const file of Array.from(fileList)) {
      const ext = file.name.split(".").pop() ?? "";
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      await supabase.storage.from(BUCKET).upload(safeName, file, { upsert: false });
      done++;
      setUploadProgress(Math.round((done / fileList.length) * 100));
    }
    setUploading(false);
    setUploadProgress(0);
    if (inputRef.current) inputRef.current.value = "";
    load();
  }

  function filterFiles(f: MediaFile) {
    if (accept === "image" && !isImage(f.name)) return false;
    if (accept === "video" && !isVideo(f.name)) return false;
    if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }

  const filtered = files.filter(filterFiles);
  const selected = files.find(f => f.id === selectedId);

  const acceptAttr = accept === "image"
    ? "image/*"
    : accept === "video"
    ? "video/*,.mp4,.webm,.mov"
    : "image/*,video/*,.pdf,.svg";

  return (
    <div
      style={{ position: "fixed", inset: 0, background: C.overlay, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={onClose}
    >
      <div
        style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: 16, width: "100%", maxWidth: 820, maxHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
          {accept === "video" ? <Film size={16} color={C.accent} /> : <ImageIcon size={16} color={C.accent} />}
          <div style={{ flex: 1 }}>
            <div style={{ color: C.text, fontWeight: 700, fontSize: 14 }}>
              {accept === "video" ? "Choose Video" : accept === "image" ? "Choose Image" : "Media Library"}
            </div>
            <div style={{ color: C.muted, fontSize: 11, marginTop: 1 }}>{files.length} files in library</div>
          </div>
          {/* Search */}
          <div style={{ position: "relative" }}>
            <Search size={12} color="#555" style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search files…"
              style={{ background: "#111", border: "1px solid #222", borderRadius: 6, color: C.text, fontSize: 12, padding: "6px 10px 6px 28px", outline: "none", width: 160 }}
            />
          </div>
          {/* Upload */}
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            style={{ display: "flex", alignItems: "center", gap: 6, background: uploading ? "#1a1100" : C.accent, color: uploading ? C.muted : "#000", border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 700, cursor: uploading ? "wait" : "pointer", flexShrink: 0 }}
          >
            <Upload size={12} />
            {uploading ? `${uploadProgress}%` : accept === "video" ? "Upload Video" : "Upload"}
          </button>
          <input ref={inputRef} type="file" multiple accept={acceptAttr} style={{ display: "none" }} onChange={upload} />
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        {/* Body: file grid + selected preview */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Grid */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {loading && (
              <div style={{ color: "#555", textAlign: "center", padding: 60, fontSize: 13 }}>Loading…</div>
            )}
            {!loading && filtered.length === 0 && (
              <div style={{ color: "#444", textAlign: "center", padding: 60, fontSize: 13 }}>
                {search ? "No files match your search" : `No ${accept === "all" ? "media" : accept} files yet — upload one above`}
              </div>
            )}
            {!loading && filtered.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
                {filtered.map(file => {
                  const sel = selectedId === file.id;
                  return (
                    <div
                      key={file.id}
                      onClick={() => setSelectedId(sel ? null : file.id)}
                      onDoubleClick={() => onSelect(file.publicUrl)}
                      style={{
                        background: C.panel, borderRadius: 8, overflow: "hidden", cursor: "pointer",
                        border: sel ? `2px solid ${C.accent}` : "2px solid transparent",
                        transition: "border-color 0.1s",
                        position: "relative",
                      }}
                      title="Click to select · Double-click to insert"
                    >
                      <div style={{ width: "100%", aspectRatio: "1", background: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        {isImage(file.name) ? (
                          <img src={file.publicUrl} alt={file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : isVideo(file.name) ? (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#444" }}>
                            <Film size={28} color="#555" />
                            <span style={{ fontSize: 9, color: "#555" }}>{file.name.split(".").pop()?.toUpperCase()}</span>
                          </div>
                        ) : (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                            <ImageIcon size={24} color="#444" />
                            <span style={{ fontSize: 9, color: "#555" }}>{file.name.split(".").pop()?.toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                      <div style={{ padding: "6px 8px" }}>
                        <div style={{ fontSize: 10, color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
                        <div style={{ fontSize: 9, color: "#555" }}>{formatBytes(file.size)}</div>
                      </div>
                      {sel && (
                        <div style={{ position: "absolute", top: 5, right: 5, background: C.accent, borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Check size={10} color="#000" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Selected preview panel */}
          {selected && (
            <div style={{ width: 220, flexShrink: 0, borderLeft: "1px solid #1a1a1a", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Preview */}
              <div style={{ background: "#0d0d0d", borderRadius: 8, overflow: "hidden", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isImage(selected.name) ? (
                  <img src={selected.publicUrl} alt={selected.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : isVideo(selected.name) ? (
                  <video src={selected.publicUrl} controls style={{ width: "100%", maxHeight: "100%", objectFit: "contain" }} />
                ) : (
                  <ImageIcon size={36} color="#444" />
                )}
              </div>
              <div>
                <div style={{ fontSize: 12, color: C.text, fontWeight: 600, wordBreak: "break-all" }}>{selected.name}</div>
                {selected.size && <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{formatBytes(selected.size)}</div>}
              </div>
              <div style={{ fontSize: 10, color: "#555", background: "#111", borderRadius: 6, padding: "6px 8px", wordBreak: "break-all", fontFamily: "monospace" }}>
                {selected.publicUrl}
              </div>
              <button
                onClick={() => onSelect(selected.publicUrl)}
                style={{ background: C.accent, color: "#000", border: "none", borderRadius: 8, padding: "10px 0", fontWeight: 700, fontSize: 13, cursor: "pointer", marginTop: "auto" }}
              >
                Insert File
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: "#555" }}>Click to select · Double-click or "Insert File" to use</span>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #2a2a2a", color: C.muted, borderRadius: 6, padding: "6px 14px", fontSize: 12, cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
