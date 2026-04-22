import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    const inviteCode = uuidv4().slice(0, 8);

    // Save invite to db
    const { error } = await supabase
      .from("invites")
      .insert([{ inviter_id: userId, invitee_email: email, code: inviteCode }]);

    if (error) throw error;

    // Log the viral behavior natively
    await supabase.from("activity_logs").insert([{
      user_id: userId,
      event: "invite_sent"
    }]);

    return NextResponse.json({ 
      success: true, 
      inviteLink: `${process.env.NEXT_PUBLIC_URL || "http://localhost:3000"}/signup?ref=${inviteCode}` 
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
