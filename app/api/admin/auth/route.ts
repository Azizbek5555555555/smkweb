import { authenticate } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const admin = await authenticate(username, password);
  if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  // Set a session cookie here (for simplicity, just return ok)
  return NextResponse.json({ success: true });
}