// src/components/Navbar.js
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { AppBar, Toolbar, Button, Tooltip, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, Link } from "react-router-dom";
import NavbarLogo from "./NavbarLogo";

function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
      <Toolbar>
        {/* Logo */}
        <NavbarLogo />

        <Box sx={{ marginLeft: "auto" }}>
          <Tooltip title="Profile">
            <Button
              color="secondary"
              component={Link}
              to="/profile"
              sx={{
                bgcolor: "primary.main",
                color: "error.contrastText",
                minWidth: "auto", // Remove minimum width to fit the icon snugly
                padding: 1, // Adjust padding as needed
                "&:hover": {
                  bgcolor: "error.dark",
                },
              }}
            >
              <AccountCircleIcon />
            </Button>
          </Tooltip>

          {/* Logout Button */}
          <Tooltip title="Logout">
            <Button
              color="secondary"
              onClick={logout}
              sx={{
                bgcolor: "primary.main",
                color: "error.contrastText",
                minWidth: "auto", // Remove minimum width to fit the icon snugly
                padding: 1, // Adjust padding as needed
                "&:hover": {
                  bgcolor: "error.dark",
                },
              }}
            >
              <LogoutIcon />
            </Button>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
