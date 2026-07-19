import React from 'react';

const Footer = () => {
  return (
    <footer className="footer animate-fade-in">
      <div className="footer-left">
        <span>Made with </span>
        <span className="footer-heart">❤️</span>
        <span> by </span>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="footer-link"
        >
          Arhan Bramhane
        </a>
      </div>
      <div className="footer-right">
        <span>Pulse Platform © {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
