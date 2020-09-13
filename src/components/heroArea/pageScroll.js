import React from "react";
import PropTypes from "prop-types";

const PageScroll = (props) => {
  const { title, anchorLink } = props;
  return (
    <div>
      <h2 id="heroImage">{title}</h2>
      <div
        tabIndex="0"
        role="button"
        className="arrow"
        onKeyDown={() => window.scrollTo(0, 570)}
        onClick={() => window.scrollTo(0, 570)}
      >
        <a href={`#${anchorLink}`}>
          <svg
            width="70"
            height="55"
            viewBox="-2.5 -5 75 60"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 l25,30 l25,-30"
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

PageScroll.propTypes = {
  title: PropTypes.string,
  anchorLink: PropTypes.string
};

PageScroll.defaultProps = {
  title: "",
  anchorLink: ""
};

export default PageScroll;
