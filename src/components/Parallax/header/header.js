import React from "react";
import Link from "gatsby-plugin-transition-link";
import "./header.scss";
import Logo from "../../../images/parallax/logo/TopNavLogo.png";

const ParallaxHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light parallax-header">
      <div className="navbar-brand parallax-header-logo">
        <Link to="/home">
          <img src={Logo} alt="AAMC Logo" />
        </Link>
      </div>
      <button
        className="navbar-toggler parallax-header-hamburger"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div
        className="collapse navbar-collapse parallax-header-right"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav nav parallax-header-links">
          <li className="nav-item">
            <a className="nav-link" href="#vision">
              Vision Statement
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#planOfAction">
              Action Plan
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#temp">
              Downloads
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ParallaxHeader;
