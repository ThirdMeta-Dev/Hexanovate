import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c15aa933/health", (c) => {
  return c.json({ status: "ok" });
});

/* ─── SMTP EMAIL HELPER ───────────────────────────────────────────────────── */
async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
  submittedAt: string;
}) {
  const smtpUser = "seo@hexanovate.com";
  const smtpPass = Deno.env.get("SMTP_PASSWORD") ?? "";
  const smtpHost = "smtp.gmail.com";
  const smtpPort = 465;

  const recipients = ["seo@hexanovate.com", "team@hexanovate.com"];

  const subject = `New Contact Form Submission from ${data.name}`;
  const bodyHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 32px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .header { background: #1b61db; padding: 28px 32px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #888888; margin-bottom: 6px; }
    .field-value { font-size: 15px; color: #1a1a1a; line-height: 1.5; background: #f8f9fc; border-left: 3px solid #1b61db; padding: 10px 14px; border-radius: 0 6px 6px 0; }
    .notes-value { white-space: pre-wrap; }
    .footer { background: #f4f4f4; padding: 16px 32px; text-align: center; font-size: 12px; color: #aaaaaa; }
    .accent { color: #FFA600; font-weight: 700; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Enquiry — Hexanovate</h1>
      <p>Submitted on ${new Date(data.submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" })} IST</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">Full Name</div>
        <div class="field-value">${escapeHtml(data.name)}</div>
      </div>
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value">${escapeHtml(data.email)}</div>
      </div>
      <div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value">${escapeHtml(data.phone)}</div>
      </div>
      <div class="field">
        <div class="field-label">Service Requested</div>
        <div class="field-value"><span class="accent">${escapeHtml(data.service)}</span></div>
      </div>
      ${data.notes ? `
      <div class="field">
        <div class="field-label">Additional Notes</div>
        <div class="field-value notes-value">${escapeHtml(data.notes)}</div>
      </div>` : ""}
    </div>
    <div class="footer">
      This email was sent automatically from the Hexanovate website contact form.
    </div>
  </div>
</body>
</html>
  `.trim();

  // Build RFC 2822 raw email message
  const boundary = `----=_Part_${Date.now()}`;
  const toHeader = recipients.join(", ");

  const rawMessage = [
    `From: "Hexanovate Website" <${smtpUser}>`,
    `To: ${toHeader}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    `New contact form submission from ${data.name}`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.service}`,
    `Notes: ${data.notes || "N/A"}`,
    `Submitted: ${data.submittedAt}`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    ``,
    bodyHtml,
    ``,
    `--${boundary}--`,
  ].join("\r\n");

  // Connect via TLS (port 465)
  const conn = await Deno.connectTls({
    hostname: smtpHost,
    port: smtpPort,
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readLine = async (): Promise<string> => {
    const buf = new Uint8Array(4096);
    let result = "";
    while (true) {
      const n = await conn.read(buf);
      if (n === null) break;
      result += decoder.decode(buf.subarray(0, n));
      if (result.includes("\r\n")) break;
    }
    return result.trim();
  };

  const send = async (cmd: string) => {
    await conn.write(encoder.encode(cmd + "\r\n"));
  };

  // SMTP handshake
  await readLine(); // 220 greeting
  await send(`EHLO ${smtpHost}`);
  // Read multi-line EHLO response
  let ehloResp = "";
  while (true) {
    const line = await readLine();
    ehloResp += line + "\n";
    if (/^250 /m.test(line) || /^\d{3} /.test(line.split("\n").pop() ?? "")) break;
  }
  console.log("EHLO response:", ehloResp);

  // AUTH LOGIN
  await send("AUTH LOGIN");
  await readLine(); // 334
  await send(btoa(smtpUser));
  await readLine(); // 334
  await send(btoa(smtpPass));
  const authResp = await readLine();
  console.log("AUTH response:", authResp);
  if (!authResp.startsWith("235")) {
    conn.close();
    throw new Error(`SMTP AUTH failed: ${authResp}`);
  }

  // MAIL FROM
  await send(`MAIL FROM:<${smtpUser}>`);
  await readLine();

  // RCPT TO for each recipient
  for (const rcpt of recipients) {
    await send(`RCPT TO:<${rcpt}>`);
    await readLine();
  }

  // DATA
  await send("DATA");
  await readLine(); // 354
  await send(rawMessage + "\r\n.");
  const dataResp = await readLine();
  console.log("DATA response:", dataResp);

  await send("QUIT");
  conn.close();

  if (!dataResp.startsWith("250")) {
    throw new Error(`SMTP DATA failed: ${dataResp}`);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ─── GOOGLE SHEETS WEBHOOK ───────────────────────────────────────────────── */
async function logToGoogleSheets(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
  submittedAt: string;
}) {
  const webhookUrl = Deno.env.get("GOOGLE_SHEETS_WEBHOOK_URL");
  if (!webhookUrl) {
    console.log("GOOGLE_SHEETS_WEBHOOK_URL not set — skipping Sheets logging.");
    return;
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const text = await res.text();
  console.log(`Google Sheets webhook response (${res.status}):`, text);
}

/* ─── CONTACT FORM SUBMISSION ─────────────────────────────────────────────── */
app.post("/make-server-c15aa933/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, service, notes } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return c.json({ error: "Name must be at least 2 characters." }, 400);
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email.trim())) {
      return c.json({ error: "A valid email address is required." }, 400);
    }
    const phoneRe = /^[\+]?[\d\s\-\(\)]{7,15}$/;
    if (!phone || !phoneRe.test(phone.trim())) {
      return c.json({ error: "A valid phone number is required." }, 400);
    }
    if (!service || typeof service !== "string" || service.trim().length === 0) {
      return c.json({ error: "Please select a service." }, 400);
    }

    const submissionData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service: service.trim(),
      notes: notes ? notes.trim() : "",
      submittedAt: new Date().toISOString(),
    };

    // Save to KV store
    const id = `contact:${Date.now()}:${Math.random().toString(36).slice(2, 9)}`;
    await kv.set(id, JSON.stringify(submissionData));
    console.log(`Contact form saved: id=${id}, email=${email}`);

    // Send email notification (non-blocking)
    try {
      await sendContactEmail(submissionData);
      console.log(`Email notification sent for submission id=${id}`);
    } catch (emailErr) {
      console.log(`Email send failed for id=${id} (submission still saved):`, emailErr);
    }

    // Log to Google Sheets (non-blocking)
    try {
      await logToGoogleSheets(submissionData);
      console.log(`Google Sheets logged for submission id=${id}`);
    } catch (sheetErr) {
      console.log(`Google Sheets logging failed for id=${id}:`, sheetErr);
    }

    return c.json({ success: true, id });
  } catch (err) {
    console.log("Error saving contact form submission:", err);
    return c.json({ error: `Failed to submit form: ${err}` }, 500);
  }
});

Deno.serve(app.fetch);