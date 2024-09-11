"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { saveLog, getLogs } from "./utils/logging";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [logs, setLogs] = useState(getLogs());
  const [history, setHistory] = useState(getLogs());

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setLogs(getLogs());
  }, [image, history]);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      saveLog("Prompt cannot be empty", "error");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.magicapi.dev/api/v1/bridgeml/text-to-image/text-to-image",
        {
          prompt,
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
      setImage(response.data.result[0]);
      setHistory((prevHistory) => [
        ...prevHistory,
        { prompt, imageUrl: response.data.result[0] },
      ]);
      saveLog("Image generated successfully", "success");
    } catch (error) {
      saveLog("Error generating image: " + error.message, "error");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = history.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(history.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Text-to-Image App</h1>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt"
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleGenerateImage}
          style={{
            padding: "10px",
            marginLeft: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#eb344f",
            color: "#fff",
          }}
        >
          Generate Image
        </button>
      </div>

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        {image && (
          <div>
            <h2>Generated Image</h2>
            <img
              src={image}
              alt="Generated"
              style={{
                width: "100%",
                maxWidth: "600px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              }}
            />
          </div>
        )}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>History</h2>
        {currentHistory.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {currentHistory.map((entry, index) => (
              <div
                key={index}
                style={{
                  margin: "10px",
                  textAlign: "center",
                  flex: "1 0 200px",
                  boxSizing: "border-box",
                }}
              >
                <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                  {entry.prompt}
                </p>
                <img
                  src={entry.imageUrl}
                  alt={`History ${index}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            No history available
          </p>
        )}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "10px",
              margin: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#eb344f",
              color: "#fff",
            }}
          >
            Previous
          </button>
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "10px",
              margin: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#eb344f",
              color: "#fff",
            }}
          >
            Next
          </button>
        </div>
      </div>

      <div>
        <h2>Logs</h2>
        {logs.length > 0 ? (
          <div>
            {logs.map((log, index) => (
              <div
                key={index}
                style={{
                  color: log.status === "error" ? "red" : "green",
                  marginBottom: "5px",
                  padding: "5px",
                  borderRadius: "5px",
                  border: `1px solid ${
                    log.status === "error" ? "red" : "green"
                  }`,
                  backgroundColor: "#f9f9f9",
                }}
              >
                {log.timestamp}: {log.message}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>
            No logs available
          </p>
        )}
      </div>
    </div>
  );
}
