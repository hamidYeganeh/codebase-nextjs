import { NextResponse } from "next/server";
import { getUserById } from "@/services/users.service";

// Proxy single user details to DummyJSON
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await getUserById(params.id);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}