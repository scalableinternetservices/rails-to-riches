// src/components/Logo.js
import React from "react";
import { NavLink } from "react-router-dom";

function NavbarLogo({ width = 80, height = 42 }) {
  return (
    <NavLink
      to="/"
      children={
        <img
          src="https://i.hizliresim.com/osre0t5.jpg"
          alt="Gaucho Eats Logo"
          width={width}
          height={height}
        />
      }
    />
  );
}

export default NavbarLogo;
