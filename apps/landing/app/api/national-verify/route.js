import { supabase } from "@/lib/supabase";
import { nationalVerify } from "@/lib/nationalVerifyEngine";

export async function POST(req) {
  try {
    const { query } = await req.json();

    if (!query) {
      return Response.json({ error: "Missing query" }, { status: 400 });
    }

    const result = await nationalVerify(query);

    // 🚨 Log verification event for audit trailing
    await supabase.from("verifications").insert({
      query,
      result: result,
      created_at: new Date().toISOString()
    }).select();

    return Response.json({
      query,
      result,
      system: "Sumbandila National Registry (Live V6)",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Verification processing failed" }, { status: 500 });
  }
}
