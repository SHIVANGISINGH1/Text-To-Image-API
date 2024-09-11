import HistoryItem from "./HistoryItem";
import { Box } from "@mui/material";

export default function History({ history }) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {history.map((item, index) => (
        <HistoryItem
          key={index}
          imageUrl={item.imageUrl}
          prompt={item.prompt}
        />
      ))}
    </Box>
  );
}
