import { getLogs } from "../generate/route.js";

export async function GET() {
  try {
    const logs = await getLogs();
    console.log("ss", logs);
    return new Response(JSON.stringify(logs), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching logs" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
