import { v4 as uuidv4 } from "uuid";

let logs = [];

export async function POST(req) {
  const { prompt } = await req.json();
  const requestId = uuidv4();
  const startTime = Date.now();
  const requestBody = {
    prompt: prompt,
    height: 1024,
    width: 1024,
    scheduler: "K_EULER",
    num_outputs: 1,
    guidance_scale: 0,
    negative_prompt: "worst quality, low quality",
    num_inference_steps: 4,
  };

  try {
    const response = await fetch(
      "https://api.magicapi.dev/api/v1/bridgeml/text-to-image/text-to-image",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-magicapi-key": process.env.local.NEXT_PUBLIC_IMAGE_API_KEY,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) throw new Error(`API error: ${response.statusText}`);

    const data = await response.json();
    const endTime = Date.now();
    const latency = endTime - startTime;

    logs.push({
      id: requestId,
      prompt,
      imageUrl: data.imageUrl,
      latency,
      status: "Success",
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ imageUrl: data.imageUrl, requestId }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    logs.push({
      id: requestId,
      prompt,
      latency: Date.now() - startTime,
      status: "Failed",
      error: error.message,
      timestamp: new Date().toISOString(),
    });

    return new Response(JSON.stringify({ error: "Error generating image" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
