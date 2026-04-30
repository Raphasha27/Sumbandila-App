import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Fallback for development if no API key is provided
      console.log("DEMO MODE: Email would be sent via Resend", { name, email, message });
      return new Response(JSON.stringify({ success: true, message: "Demo mode: Check console" }), { status: 200 });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Sumbandila Contact <onboarding@resend.dev>",
      to: ["raphashakoketso99@gmail.com"],
      subject: `New Contact Form Message from ${name}`,
      reply_to: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Resend Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
