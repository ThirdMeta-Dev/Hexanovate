import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

export function AdminRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#666", fontSize: 14 }}>Loading...</div>
      </div>
    );
  }

  if (!session) return <Navigate to="/admin/login" replace />;
  return <>{children}</>;
}
