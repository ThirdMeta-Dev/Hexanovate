import { Link, useLocation, useNavigate } from "react-router";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, LogOut, Globe } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  backLink?: { href: string; label: string };
}

export function AdminLayout({ children, title, backLink }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid #1a1a1a",
        padding: "0 24px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        background: "#0a0a0a",
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link to="/admin" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, background: "#FFA600", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LayoutDashboard size={16} color="#000" />
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>ThirdMeta CMS</span>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, color: "#888", textDecoration: "none", fontSize: 13 }}
          >
            <Globe size={14} />
            View Site
          </a>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "none", border: "1px solid #2a2a2a",
              color: "#888", cursor: "pointer", padding: "6px 12px",
              borderRadius: 6, fontSize: 13,
            }}
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {backLink && (
          <Link
            to={backLink.href}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#888", textDecoration: "none", fontSize: 13, marginBottom: 20 }}
          >
            ← {backLink.label}
          </Link>
        )}
        {title && (
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 24px", color: "#fff" }}>{title}</h1>
        )}
        {children}
      </main>
    </div>
  );
}
