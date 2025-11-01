import { NextResponse } from "next/server";
import { getUsers } from "@/services/users.service";

// Proxy list users to DummyJSON via server-side axios
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const params: Record<string, string> = {};
    for (const [key, value] of url.searchParams.entries()) {
      params[key] = value;
    }
    const data = await getUsers(params);
    return NextResponse.json(data, {
      status: 200,
      headers: {
        // Optional: enable short caching for repeat calls
        "Cache-Control": "public, max-age=60, s-maxage=300",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}