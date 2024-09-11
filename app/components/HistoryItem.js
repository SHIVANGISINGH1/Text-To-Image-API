import { Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function HistoryItem({ imageUrl, prompt }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        mb: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt="Generated image"
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {prompt}
        </Typography>
      </CardContent>
    </Card>
  );
}
