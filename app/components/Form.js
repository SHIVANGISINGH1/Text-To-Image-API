"use client";

import { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";
import { saveLog } from "../utils/logging";

export default function Form({ setImageUrl, setHistory }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
    console.log(requestBody);

    try {
      const response = await axios.post(
        "https://api.magicapi.dev/api/v1/bridgeml/text-to-image/text-to-image",
        requestBody,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-magicapi-key": process.env.NEXT_PUBLIC_IMAGE_API_KEY,
          },
        }
      );
      const imageUrl = response.data.result[0];
      setImageUrl(imageUrl);

      // Update history
      const newHistory = JSON.parse(localStorage.getItem("history")) || [];
      newHistory.unshift({
        id: new Date().toISOString(),
        prompt: prompt,
        imageUrl: imageUrl,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("history", JSON.stringify(newHistory));
      setHistory(newHistory);

      saveLog("Image generated successfully", "success");
    } catch (error) {
      console.error("Error generating image:", error);

      saveLog("Error generating image: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          label="Enter prompt"
          variant="outlined"
          fullWidth
          required
        />
        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="warning"
            sx={{ marginRight: 1 }}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Image"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
