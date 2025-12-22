import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../reusableUi/buttons/button";
import "./header.css";

import { isAuthenticated, logout } from "../../utils/auth";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleAuthClick() {
    if (isAuthenticated()) {
      logout();
      navigate("/login");
    } else {
      navigate("/login");
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo" onClick={() => navigate("/")}>
          <span>2care</span>
        </div>

        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/dashboard" onClick={closeMenu}>
            Dashboard
          </NavLink>
          <NavLink to="/reports" onClick={closeMenu}>
            Reports
          </NavLink>
          <NavLink to="/vitals" onClick={closeMenu}>
            Vitals
          </NavLink>
        </nav>

        <div className="header-actions">
          <Button variant="primary" size="md" onClick={handleAuthClick}>
            {isAuthenticated() ? "Logout" : "Login"}
          </Button>

          <Button
            size="icon"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
