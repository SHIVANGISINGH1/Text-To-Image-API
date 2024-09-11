import { Box } from "@mui/material";

export default function ImageDisplay({ imageUrl }) {
  return (
    <Box sx={{ boxShadow: 3, borderRadius: 2, p: 2, backgroundColor: "#fff" }}>
      <img
        src={imageUrl}
        alt="Generated"
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
}
