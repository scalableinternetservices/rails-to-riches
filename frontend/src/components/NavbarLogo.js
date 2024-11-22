// src/components/NavbarLogo.js
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"; 
function NavbarLogo({ width = 80, height = 42 }) {
  return (
    <NavLink to="/">
      <img
        src={logo}
        alt="Gaucho Eats Logo"
        width={width}
        height={height}
        style={{ objectFit: "contain" }}
      />
    </NavLink>
  );
}

export default NavbarLogo;
