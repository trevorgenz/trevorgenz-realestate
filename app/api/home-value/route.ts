import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { address, name, email, phone, timeframe } = await req.json();

  if (!address || !name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Home Value Form <onboarding@resend.dev>",
      to: "trevorgenz@gmail.com",
      subject: `New Home Value Request — ${address}`,
      html: `
        <h2 style="color:#0f172a">New Home Value Lead</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;font-family:sans-serif">
          <tr><td style="padding:10px 12px;font-weight:bold;background:#f1f5f9;width:120px">Address</td><td style="padding:10px 12px">${address}</td></tr>
          <tr><td style="padding:10px 12px;font-weight:bold;background:#f1f5f9">Name</td><td style="padding:10px 12px">${name}</td></tr>
          <tr><td style="padding:10px 12px;font-weight:bold;background:#f1f5f9">Email</td><td style="padding:10px 12px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:10px 12px;font-weight:bold;background:#f1f5f9">Phone</td><td style="padding:10px 12px">${phone || "—"}</td></tr>
          <tr><td style="padding:10px 12px;font-weight:bold;background:#f1f5f9">Timeframe</td><td style="padding:10px 12px">${timeframe}</td></tr>
        </table>
        <p style="margin-top:16px;color:#64748b;font-size:13px">Submitted via trevorgenz-realestate.com</p>
      `,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
