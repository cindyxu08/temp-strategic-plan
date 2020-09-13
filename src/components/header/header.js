import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import Share from "./share";
import "./header.scss";
import "../../styles/global.scss";

const Header = ({ dropdownData, siteLogo, path }) => (
  <header className="header">
    <nav className="navbar layout-header-navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <img src={siteLogo} alt="AAMC Logo" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li
            className={
              path === "/"
                ? "nav-item active layout-header-nav-item"
                : "nav-item layout-header-nav-item"
            }
          >
            <Link className="nav-link layout-header-link" to="/">
              Our Plan
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li
            className={
              path !== "/"
                ? "nav-item active dropdown layout-header-dropdown layout-header-nav-item"
                : "nav-item dropdown layout-header-dropdown layout-header-nav-item"
            }
          >
            <a
              className="nav-link dropdown-toggle layout-header-link"
              href="#0"
              tabIndex="0"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Goals
            </a>
            <div
              className="dropdown-menu layout-header-dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              {dropdownData.map((goal, index) => (
                <Link
                  className="dropdown-item layout-header-dropdown-item"
                  key={goal.path}
                  to={goal.path}
                >
                  {`${index + 1} ${goal.title}`}
                </Link>
              ))}
            </div>
          </li>
          <li className="nav-item dropdown layout-header-dropdown layout-header-nav-item">
            <a
              className="nav-link dropdown-toggle layout-header-link"
              href="#0"
              tabIndex="0"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <svg
                id="share-icon"
                role="img"
                data-name="share-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-labelledby="label-share-icon"
              >
                <title id="label-share-icon">Share Icon</title>
                <circle className="fill" fill="#FFF" cx="4.2" cy="11.5" r="4" />
                <circle
                  className="fill"
                  fill="#FFF"
                  cx="18.8"
                  cy="18.3"
                  r="4"
                />
                <circle className="fill" fill="#FFF" cx="18.8" cy="4.7" r="4" />
                <line
                  className="svg-bg"
                  fill="none"
                  stroke="#FFF"
                  strokeMiterlimit="10"
                  x1="4.2"
                  y1="11.5"
                  x2="18.8"
                  y2="4.7"
                />
                <line
                  className="svg-bg"
                  fill="none"
                  stroke="#FFF"
                  strokeMiterlimit="10"
                  x1="18.8"
                  y1="18.3"
                  x2="4.2"
                  y2="11.5"
                />
              </svg>
            </a>
            <div
              className="dropdown-menu layout-header-dropdown-menu share-dropdown"
              aria-labelledby="navbarDropdown"
            >
              <Share />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
);

Header.propTypes = {
  dropdownData: PropTypes.arrayOf(PropTypes.any),
  siteLogo: PropTypes.string,
  path: PropTypes.string.isRequired
};

Header.defaultProps = {
  dropdownData: [],
  siteLogo: ""
};

export default Header;
