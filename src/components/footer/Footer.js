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
            <a href="#">
              <i className="fab fa-tiktok"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-x-twitter"></i>{" "}
              {/* Ikon Twitter sudah diperbarui menjadi X */}
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>

        <div className="footer__links">
          <ul>
            <li>
              <a href="#">Help</a>
            </li>
            <li>
              <a href="#">Press Room</a>
            </li>
            <li>
              <a href="#">Advertising</a>
            </li>
            <li>
              <a href="#">Jobs</a>
            </li>
            <li>
              <a href="#">Conditions of Use</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
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
