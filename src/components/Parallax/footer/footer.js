import React from "react";
import Link from "gatsby-plugin-transition-link";
import PropTypes from "prop-types";
import QuickLinks from "../../shared/quickLinks/quickLinks";
import SocialMedia from "../../shared/socialMedia/socialMedia";
import BackgroundImage from "../../../images/parallax/footer/ice-in-ocean-waters@2x.png";
import FooterLogo from "../../../images/parallax/logo/Footer Logo@2x.png";
import "./footer.scss";

const ParallaxFooter = ({ footerData }) => {
  return (
    <div className="parallax-footer">
      <div id="test" className="parallax-footer-top-section-wrapper">
        <img
          alt="backgroundBlur"
          className="parallax-footer-top-section-background"
          src={BackgroundImage}
        />
        <div className="parallax-footer-top-section">
          <div className="parallax-footer-logo">
            <Link to="/">
              <img src={FooterLogo} alt="AAMC Logo" />
            </Link>
          </div>
          <div className="parallax-footer-links">
            <QuickLinks quickLinkData={footerData.quickLinks} />
          </div>
        </div>
      </div>
      <div className=" row parallax-footer-bottom-section">
        <div className="parallax-footer-social-media-wrapper col-md-6">
          <div className="parallax-footer-social-media-icons">
            <SocialMedia data={footerData.socialMedia} />
          </div>
        </div>
        <div className="parallax-footer-newsletter-wrapper col-md-6">
          <div className="parallax-footer-newsletter">
            Sign up for AAMC e-news
          </div>
        </div>
      </div>
    </div>
  );
};

ParallaxFooter.propTypes = {
  footerData: PropTypes.shape().isRequired
};

export default ParallaxFooter;
