"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { saveLog, getLogs } from "../utils/logging";

export default function ImageFetcher() {
  const [image, setImage] = useState(null);
  const [logs, setLogs] = useState(getLogs());

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await axios.post(
          "https://api.magicapi.dev/api/v1/bridgeml/text-to-image/text-to-image",
          {
            prompt: "Futuristic space battle, hyper realistic, 4k",
            height: 1024,
            width: 1024,
            scheduler: "K_EULER",
            num_outputs: 1,
            guidance_scale: 0,
            negative_prompt: "worst quality, low quality",
            num_inference_steps: 4,
          },
          {
            headers: {
              accept: "application/json",
              "x-magicapi-key": process.env.NEXT_PUBLIC_IMAGE_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        setImage(response.data.imageUrl);
        saveLog("Image fetched successfully", "success");
      } catch (error) {
        saveLog("Error fetching image: " + error.message, "error");
      }
      setLogs(getLogs());
    }

    fetchImage();
  }, []);

  return (
    <div>
      {image ? <img src={image} alt="Generated" /> : <p>Loading...</p>}
      <div>
        <h2>Logs</h2>
        {logs.map((log, index) => (
          <div
            key={index}
            style={{ color: log.status === "error" ? "red" : "green" }}
          >
            {log.timestamp}: {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}
