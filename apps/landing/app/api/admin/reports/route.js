import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from("reports")
      .insert({
        target_name: body.target_name,
        reason: body.reason,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select();

    if (error) throw error;

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: "Failed to submit report" }, { status: 500 });
  }
}
