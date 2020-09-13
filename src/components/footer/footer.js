import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import QuickLinks from "../shared/quickLinks/quickLinks";
import SocialMedia from "../shared/socialMedia/socialMedia";
import Subscription from "./subscription";
import "./footer.scss";

const Footer = ({ footerData, siteLogo }) => {
  return (
    <div id="footer-section" className="footer">
      <div className="row logo-links-wrapper">
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 ">
          <Link to="/">
            <img className="footer-logo" src={siteLogo} alt="AAMC Logo" />
          </Link>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
          <div className="pageLinks">
            <QuickLinks quickLinkData={footerData.quickLinks} />
          </div>
        </div>
      </div>
      <hr />
      <div className="row social-sub-wrapper">
        <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-5 ">
          <div className="socialMedia">
            <SocialMedia data={footerData.socialMedia} />
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-7">
          <div className="subscription">
            <Subscription />
          </div>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  footerData: PropTypes.shape(),
  siteLogo: PropTypes.string
};
Footer.defaultProps = {
  footerData: {},
  siteLogo: ""
};
export default Footer;
