import React from "react";
import Link from "gatsby-plugin-transition-link";
import PropTypes from "prop-types";
import "./quickLinks.scss";

const createList = (data) => (
  <>
    <div className="section-title">{data.title || ""}</div>
    <ul>
      {data.data.map((val) => {
        return (
          <li>
            {val.path.startsWith("/") ? (
              <Link to={val.path}>{val.name}</Link>
            ) : (
              <a href={val.path}>{val.name}</a>
            )}
          </li>
        );
      })}
    </ul>
  </>
);

const QuickLinks = ({ quickLinkData }) => {
  return (
    <div className="row">
      <div className="col-md-4">{createList(quickLinkData.Media)}</div>
      <div className="col-md-4">{createList(quickLinkData.Resources)}</div>
      <div className="col-md-4">{createList(quickLinkData.Quick_Links)}</div>
    </div>
  );
};

QuickLinks.propTypes = {
  quickLinkData: PropTypes.shape().isRequired
};

export default QuickLinks;
