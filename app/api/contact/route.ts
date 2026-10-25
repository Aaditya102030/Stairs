import { NextRequest, NextResponse } from "next/server";

/**
 * Contact form → email, sent through Resend (https://resend.com).
 *
 * Environment variables (put them in .env.local, then restart `npm run dev`):
 *   RESEND_API_KEY      required — API key from the Resend dashboard
 *   CONTACT_TO_EMAIL    optional — where messages are delivered (default: info@stairsphysiotherapy.in)
 *   CONTACT_FROM_EMAIL  optional — sender, e.g. "Stairs Website <contact@yourdomain.in>"
 *                       (default: Resend's shared test sender, which can only deliver to the
 *                       email address your Resend account was created with)
 */

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").replace(/[\r\n]+/g, " ").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Contact form error: RESEND_API_KEY is not set. Add it to .env.local and restart the dev server.");
      return NextResponse.json({ error: "Email service is not configured yet." }, { status: 500 });
    }

    const to = process.env.CONTACT_TO_EMAIL || "info@stairsphysiotherapy.in";
    const from = process.env.CONTACT_FROM_EMAIL || "Stairs Website <onboarding@resend.dev>";

    const safe = {
      name: escapeHtml(name),
      phone: escapeHtml(phone),
      email: escapeHtml(email),
      subject: escapeHtml(subject),
      message: escapeHtml(message),
    };

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #e8372c; padding: 24px 32px;">
          <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">STAIRS</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;">New Contact Form Submission</p>
        </div>
        <div style="background: #1a1a1a; padding: 32px; color: #ccc;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; color: #888; font-size: 13px; width: 100px;">Name</td><td style="padding: 10px 0; color: #fff; font-size: 15px;">${safe.name}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 10px 0; color: #fff; font-size: 15px;"><a href="mailto:${safe.email}" style="color: #e8372c;">${safe.email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Phone</td><td style="padding: 10px 0; color: #fff; font-size: 15px;">${safe.phone}</td></tr>` : ""}
            ${subject ? `<tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Subject</td><td style="padding: 10px 0; color: #fff; font-size: 15px;">${safe.subject}</td></tr>` : ""}
          </table>
          <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #333;">
            <p style="color: #888; font-size: 13px; margin-bottom: 10px;">MESSAGE</p>
            <p style="color: #eee; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${safe.message}</p>
          </div>
        </div>
        <div style="background: #111; padding: 16px 32px; text-align: center;">
          <p style="color: #555; font-size: 12px; margin: 0;">Sent from Stairs contact form</p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: subject ? `[Stairs Contact] ${subject}` : `[Stairs Contact] New message from ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Contact form error: Resend responded", res.status, detail);
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
