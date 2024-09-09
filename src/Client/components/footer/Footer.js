import React from "react";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="footer__social-icons">
          <h3 className="footer__title">Follow Us on Social Media</h3>
          <div className="social-icons">
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-tiktok"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>

        <div className="footer__links">
          <ul>
            <li>
              <a href="/help">Help</a>
            </li>
            <li>
              <a href="/press-room">Press Room</a>
            </li>
            <li>
              <a href="/advertising">Advertising</a>
            </li>
            <li>
              <a href="/jobs">Jobs</a>
            </li>
            <li>
              <a href="/conditions">Conditions of Use</a>
            </li>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer__copyright">
          <p>&copy; 2024 by SandChikIMDB.com, Inc.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
