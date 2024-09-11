import { Typography, Box } from "@mui/material";

const Footer = () => (
  <Box sx={{ mt: 4, py: 2, textAlign: "center", borderTop: "1px solid #ddd" }}>
    <Typography variant="body2" color="textSecondary">
      &copy; 2024 VisualFrame &#x2764;
    </Typography>
  </Box>
);

export default Footer;
