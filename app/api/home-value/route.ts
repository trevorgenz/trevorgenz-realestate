import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { address, name, email, phone, timeframe } = await req.json();

  if (!address || !name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Trevor Genz Website" <${process.env.GMAIL_USER}>`,
    to: "trevorgenz@gmail.com",
    subject: `🏠 New Home Value Request — ${address}`,
    html: `
      <h2>New Home Value Lead</h2>
      <table style="border-collapse:collapse;width:100%;max-width:500px">
        <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Address</td><td style="padding:8px">${address}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Name</td><td style="padding:8px">${name}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Phone</td><td style="padding:8px">${phone || "—"}</td></tr>
        <tr><td style="padding:8px;font-weight:bold;background:#f1f5f9">Timeframe</td><td style="padding:8px">${timeframe}</td></tr>
      </table>
      <p style="margin-top:16px;color:#64748b;font-size:13px">Submitted via trevorgenz-realestate.com</p>
    `,
  });

  return NextResponse.json({ ok: true });
}
