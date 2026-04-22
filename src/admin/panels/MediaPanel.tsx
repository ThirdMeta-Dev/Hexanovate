import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Upload, Copy, Trash2, Check, Image as ImageIcon, RefreshCw, X } from "lucide-react";

const BUCKET = "cms-media";
const C = {
  bg: "#0a0a0a", panel: "#111", panelBorder: "#1e1e1e",
  accent: "#FFA600", text: "#fff", muted: "#888", dim: "#444",
  green: "#4ade80", red: "#ff6b6b",
};

interface MediaFile {
  name: string;
  id: string;
  publicUrl: string;
  size?: number;
  created_at?: string;
}

function formatBytes(b?: number) {
  if (!b) return "—";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / 1024 / 1024).toFixed(1)} MB`;
}

export function MediaPanel() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<MediaFile | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  async function ensureBucket() {
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.find(b => b.name === BUCKET)) {
      await supabase.storage.createBucket(BUCKET, { public: true });
    }
  }

  async function loadFiles() {
    setLoading(true);
    setError(null);
    try {
      await ensureBucket();
      const { data, error: listErr } = await supabase.storage.from(BUCKET).list("", {
        limit: 200, sortBy: { column: "created_at", order: "desc" },
      });
      if (listErr) throw listErr;
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
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load files");
    }
    setLoading(false);
  }

  useEffect(() => { loadFiles(); }, []);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setUploadProgress(0);
    let done = 0;
    const total = fileList.length;
    for (const file of Array.from(fileList)) {
      const ext = file.name.split(".").pop() ?? "";
      const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      await supabase.storage.from(BUCKET).upload(safeName, file, { upsert: false });
      done++;
      setUploadProgress(Math.round((done / total) * 100));
    }
    setUploading(false);
    setUploadProgress(0);
    if (inputRef.current) inputRef.current.value = "";
    loadFiles();
  }

  async function copyUrl(file: MediaFile) {
    await navigator.clipboard.writeText(file.publicUrl);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function deleteFile(file: MediaFile) {
    if (!confirm(`Delete "${file.name}"?`)) return;
    setDeletingId(file.id);
    await supabase.storage.from(BUCKET).remove([file.name]);
    setDeletingId(null);
    setFiles(prev => prev.filter(f => f.id !== file.id));
    if (preview?.id === file.id) setPreview(null);
  }

  const isImage = (name: string) => /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(name);

  return (
    <div style={{ padding: "32px 40px", minHeight: "100%", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>Media Library</h1>
          <p style={{ color: C.muted, fontSize: 13, margin: "4px 0 0" }}>{files.length} files in cms-media bucket</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={loadFiles}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: `1px solid #2a2a2a`, color: C.muted, cursor: "pointer", padding: "8px 14px", borderRadius: 7, fontSize: 13 }}
          >
            <RefreshCw size={13} />Refresh
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            style={{ display: "flex", alignItems: "center", gap: 6, background: uploading ? "#1a1100" : C.accent, color: uploading ? C.muted : "#000", border: "none", cursor: uploading ? "wait" : "pointer", padding: "8px 16px", borderRadius: 7, fontSize: 13, fontWeight: 700 }}
          >
            <Upload size={13} />{uploading ? `Uploading ${uploadProgress}%` : "Upload Files"}
          </button>
          <input ref={inputRef} type="file" multiple accept="image/*,video/*,.pdf,.svg" style={{ display: "none" }} onChange={upload} />
        </div>
      </div>

      {error && (
        <div style={{ background: "#1a0808", border: "1px solid #3a1515", borderRadius: 8, padding: "12px 16px", color: C.red, fontSize: 13, marginBottom: 20 }}>
          {error}
        </div>
      )}

      {/* Drag-drop zone (visible when no files) */}
      {!loading && files.length === 0 && (
        <div
          onClick={() => inputRef.current?.click()}
          style={{ border: `2px dashed #2a2a2a`, borderRadius: 12, padding: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, cursor: "pointer", color: C.muted }}
        >
          <ImageIcon size={40} color="#333" />
          <div style={{ fontSize: 15, fontWeight: 600, color: "#555" }}>No media files yet</div>
          <div style={{ fontSize: 13 }}>Click to upload your first file</div>
        </div>
      )}

      {loading && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 80, color: "#444" }}>Loading…</div>
      )}

      {/* Grid */}
      {!loading && files.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
          {files.map(file => (
            <div
              key={file.id}
              style={{ background: C.panel, border: `1px solid ${C.panelBorder}`, borderRadius: 10, overflow: "hidden", cursor: "pointer", position: "relative" }}
              onClick={() => setPreview(file)}
            >
              {/* Thumbnail */}
              <div style={{ width: "100%", aspectRatio: "1", background: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {isImage(file.name) ? (
                  <img src={file.publicUrl} alt={file.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#444" }}>
                    <ImageIcon size={28} />
                    <span style={{ fontSize: 10, color: "#555" }}>{file.name.split(".").pop()?.toUpperCase()}</span>
                  </div>
                )}
              </div>

              {/* Info bar */}
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: 11, color: "#bbb", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
                <div style={{ fontSize: 10, color: C.dim, marginTop: 2 }}>{formatBytes(file.size)}</div>
              </div>

              {/* Action buttons (appear on hover via JS) */}
              <div
                style={{ position: "absolute", top: 6, right: 6, display: "flex", gap: 4 }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => copyUrl(file)}
                  title="Copy URL"
                  style={{ background: "rgba(0,0,0,0.75)", border: "none", borderRadius: 5, padding: "4px 6px", cursor: "pointer", color: copiedId === file.id ? C.green : "#aaa" }}
                >
                  {copiedId === file.id ? <Check size={11} /> : <Copy size={11} />}
                </button>
                <button
                  onClick={() => deleteFile(file)}
                  disabled={deletingId === file.id}
                  title="Delete"
                  style={{ background: "rgba(0,0,0,0.75)", border: "none", borderRadius: 5, padding: "4px 6px", cursor: "pointer", color: C.red, opacity: deletingId === file.id ? 0.5 : 1 }}
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview modal */}
      {preview && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
          onClick={() => setPreview(null)}
        >
          <div
            style={{ background: "#111", borderRadius: 16, padding: 24, maxWidth: 680, width: "100%", position: "relative" }}
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setPreview(null)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: C.muted, cursor: "pointer" }}>
              <X size={18} />
            </button>
            {isImage(preview.name) && (
              <img src={preview.publicUrl} alt={preview.name} style={{ width: "100%", maxHeight: 400, objectFit: "contain", borderRadius: 8, marginBottom: 16 }} />
            )}
            <div style={{ fontSize: 13, color: C.text, fontWeight: 600, marginBottom: 6 }}>{preview.name}</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>{formatBytes(preview.size)}</div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, background: C.bg, border: "1px solid #2a2a2a", borderRadius: 7, padding: "8px 12px", fontSize: 12, color: "#888", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {preview.publicUrl}
              </div>
              <button
                onClick={() => copyUrl(preview)}
                style={{ background: copiedId === preview.id ? C.green : C.accent, color: "#000", border: "none", borderRadius: 7, padding: "8px 16px", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}
              >
                {copiedId === preview.id ? <><Check size={12} />Copied!</> : <><Copy size={12} />Copy URL</>}
              </button>
              <button
                onClick={() => deleteFile(preview)}
                style={{ background: "none", border: `1px solid #3a1515`, color: C.red, borderRadius: 7, padding: "8px 14px", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}
              >
                <Trash2 size={12} />Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
