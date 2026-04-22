import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { userId, name } = await req.json();

    const { data: workspace, error } = await supabase
      .from("workspaces")
      .insert([{ owner_id: userId, name }])
      .select()
      .single();

    if (error) throw error;

    // Log Activity (Growth Loop Hook)
    await supabase.from("activity_logs").insert([{
      user_id: userId,
      event: "workspace_created"
    }]);

    return NextResponse.json({ workspace });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
