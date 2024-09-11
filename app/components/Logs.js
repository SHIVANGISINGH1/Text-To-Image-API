import { Box, Typography } from "@mui/material";

export default function Logs({ logs }) {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Logs
      </Typography>
      {logs.map((log, index) => (
        <Box
          key={index}
          sx={{ color: log.status === "error" ? "red" : "green" }}
        >
          {log.timestamp}: {log.message}
        </Box>
      ))}
    </Box>
  );
}
