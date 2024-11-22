// src/components/Navbar.js
import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { AppBar, Toolbar, Button, Tooltip, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home"; // Import HomeIcon
import { useNavigate, Link } from "react-router-dom";
import NavbarLogo from "./NavbarLogo";
import ConfirmDialog from "./ConfirmDialog";

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const logout = () => {
    setOpen(false);
    handleLogout();
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "primary.main" }}>
        <Toolbar>
          {/* Logo */}
          <NavbarLogo />

          <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
            {/* Home Button */}
            <Tooltip title="Home">
              <Button
                color="secondary"
                component={Link}
                to="/"
                sx={{
                  bgcolor: "primary.main",
                  color: "error.contrastText",
                  minWidth: "auto", // Remove minimum width to fit the icon snugly
                  padding: 1, // Adjust padding as needed
                  marginRight: 1, // Space between Home and Profile buttons
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                }}
              >
                <HomeIcon />
              </Button>
            </Tooltip>

            {/* Profile Button */}
            <Tooltip title="Profile">
              <Button
                color="secondary"
                component={Link}
                to="/profile"
                sx={{
                  bgcolor: "primary.main",
                  color: "error.contrastText",
                  minWidth: "auto",
                  padding: 1,
                  marginRight: 1, // Space between Profile and Logout buttons
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
                onClick={handleOpen}
                sx={{
                  bgcolor: "primary.main",
                  color: "error.contrastText",
                  minWidth: "auto",
                  padding: 1,
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                }}
              >
                <LogoutIcon />
              </Button>
            </Tooltip>
            <ConfirmDialog
              content={"Are you sure you want to logout?"}
              open={open}
              handleClose={handleClose}
              handleConfirm={logout}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
