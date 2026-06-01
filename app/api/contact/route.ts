import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Stairs Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: subject ? `[Stairs Contact] ${subject}` : `[Stairs Contact] New message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #e8372c; padding: 24px 32px;">
            <h1 style="color: white; margin: 0; font-size: 24px; letter-spacing: 2px;">STAIRS</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;">New Contact Form Submission</p>
          </div>
          <div style="background: #1a1a1a; padding: 32px; color: #ccc;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; color: #888; font-size: 13px; width: 100px;">Name</td><td style="padding: 10px 0; color: #fff; font-size: 15px;">${name}</td></tr>
              <tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Email</td><td style="padding: 10px 0; color: #fff; font-size: 15px;"><a href="mailto:${email}" style="color: #e8372c;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Phone</td><td style="padding: 10px 0; color: #fff; font-size: 15px;">${phone}</td></tr>` : ""}
              ${subject ? `<tr><td style="padding: 10px 0; color: #888; font-size: 13px;">Subject</td><td style="padding: 10px 0; color: #fff; font-size: 15px;">${subject}</td></tr>` : ""}
            </table>
            <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #333;">
              <p style="color: #888; font-size: 13px; margin-bottom: 10px;">MESSAGE</p>
              <p style="color: #eee; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="background: #111; padding: 16px 32px; text-align: center;">
            <p style="color: #555; font-size: 12px; margin: 0;">Sent from Stairs contact form</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
