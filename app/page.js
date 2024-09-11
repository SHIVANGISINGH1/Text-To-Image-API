// pages.js
"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  CardContent,
} from "@mui/material";
import { format } from "date-fns";
import Form from "./components/Form";
import Logs from "./components/Logs";

const PAGE_SIZE = 5;

export default function Page() {
  const [imageUrl, setImageUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Load history and logs from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const savedLogs = localStorage.getItem("logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, [imageUrl]);

  // Handle pagination change
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate paginated history
  const paginatedHistory = history.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Text-to-Image Generator
      </Typography>

      <Form
        setImageUrl={setImageUrl}
        setHistory={setHistory}
        setLogs={setLogs}
      />

      {imageUrl && (
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Generated Image
          </Typography>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: "100%" }} />
        </Box>
      )}

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          History
        </Typography>
        <Grid container spacing={2}>
          {paginatedHistory.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <img
                  src={item.imageUrl}
                  alt={item.prompt}
                  style={{ width: "100%" }}
                />
                <CardContent>
                  <Typography variant="body1">{item.prompt}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {format(new Date(item.timestamp), "yyyy-MM-dd HH:mm:ss")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => handlePaginationChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={() => handlePaginationChange(currentPage + 1)}
            disabled={paginatedHistory.length < PAGE_SIZE}
          >
            Next
          </Button>
        </Box>
      </Box>

      <Logs logs={logs} />
    </Box>
  );
}
