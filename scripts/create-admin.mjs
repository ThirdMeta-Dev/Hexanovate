#!/usr/bin/env node
// Run: SUPABASE_SERVICE_KEY=<your-service-role-key> node scripts/create-admin.mjs
// Get service role key from: Supabase Dashboard → Settings → API → service_role key

const PROJECT_URL = "https://aovvrjsdsbzjlpbodasb.supabase.co";
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

const ADMIN_EMAIL = "admin@hexanovate.com";
const ADMIN_PASSWORD = "Hx@2026!Zk9mQpR3";

if (!SERVICE_KEY) {
  console.error(
    "ERROR: Set SUPABASE_SERVICE_KEY environment variable.\n" +
    "Get it from: Supabase Dashboard → Settings → API → service_role key\n\n" +
    "Run: SUPABASE_SERVICE_KEY=your_key node scripts/create-admin.mjs"
  );
  process.exit(1);
}

async function createAdmin() {
  console.log("Creating admin user...");

  const res = await fetch(`${PROJECT_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SERVICE_KEY,
      "Authorization": `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.message?.includes("already been registered")) {
      console.log("Admin user already exists.");
      console.log("\n─── Admin Credentials ───────────────────");
      console.log(`  Email:    ${ADMIN_EMAIL}`);
      console.log(`  Password: ${ADMIN_PASSWORD}`);
      console.log(`  URL:      /admin`);
      console.log("─────────────────────────────────────────");
      return;
    }
    throw new Error(`Failed to create user: ${JSON.stringify(data)}`);
  }

  console.log("✓ Admin user created successfully!\n");
  console.log("─── Admin Credentials ───────────────────");
  console.log(`  Email:    ${ADMIN_EMAIL}`);
  console.log(`  Password: ${ADMIN_PASSWORD}`);
  console.log(`  URL:      /admin`);
  console.log("─────────────────────────────────────────");
  console.log("\nSave these credentials securely. They won't be shown again.");
}

createAdmin().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
