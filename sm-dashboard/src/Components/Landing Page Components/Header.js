import React from "react";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav-menu">
        <a href="#home" className="nav-item">Home</a>
        <a href="#about" className="nav-item">About</a>
        <a href="#contact" className="nav-item">Contact</a>
      </nav>
      <button className="buy-now-button">Buy Now</button>
    </header>
  );
};

export default Header;