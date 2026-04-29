import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("verifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch history" }, { status: 500 });
  }
}
