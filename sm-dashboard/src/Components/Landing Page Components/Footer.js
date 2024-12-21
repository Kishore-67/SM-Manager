import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="nav1">
      <p>©2023 YourCompany</p>
      <h3>Landing</h3>
      <button className="btn-primary">Purchase Now</button>
      </nav>
      <hr className="footer-line"></hr>
      <nav className="nav1">
      <nav>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <nav className="social-icons">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-youtube"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram"></i>
          </a>
      </nav>
      </nav>
    </footer>
  );
};

export default Footer;
