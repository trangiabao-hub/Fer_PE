import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
export const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar component="nav">
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button key={1} sx={{ color: "#fff" }}>
              Home
            </Button>{" "}
            <Button
              key={2}
              sx={{ color: "#fff" }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Button>{" "}
            <Button key={3} sx={{ color: "#fff" }}>
              Contact
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};
