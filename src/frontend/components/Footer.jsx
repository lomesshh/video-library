import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer__flex">
        <div className="footer__text">
          <h2>
            Made with <i className="fas fa-heart"></i> by Lomesh
          </h2>
        </div>
        <div className="footer__social">
          <a href="https://github.com/lomesshh">
            <i className="fab fa-github fa-2x"></i>
          </a>
          <a href="https://www.linkedin.com/in/lomesshh/">
            <i className="fab fab fa-linkedin fa-2x"></i>
          </a>
          <a href="https://twitter.com/lomesshh">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
