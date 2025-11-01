import { NextResponse } from "next/server";

// NOTE: In a real app, store this subscription in a database
export async function POST(request: Request) {
  try {
    const subscription = await request.json();
    console.log("Push subscription received:", subscription);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid subscription" }, { status: 400 });
  }
}