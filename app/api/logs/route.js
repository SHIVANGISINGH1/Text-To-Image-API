// app/api/logs/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const { logMessage, status } = await request.json();

  console.log(`Log Status: ${status}, Message: ${logMessage}`);

  return NextResponse.json({ success: true });
}
