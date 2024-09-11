import { Typography, AppBar, Toolbar } from "@mui/material";

const Header = () => (
  <AppBar position="static">
    <Toolbar
      sx={{
        backgroundColor: "orange",
        color: "white",
        padding: "1px",
      }}
    >
      <Typography variant="h4" component="div">
        VisualFrame
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
