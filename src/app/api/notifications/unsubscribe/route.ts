import { NextResponse } from "next/server";

// NOTE: In a real app, remove this subscription from your database
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Unsubscribe endpoint:", body?.endpoint);
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}