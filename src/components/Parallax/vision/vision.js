import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import Slide from "react-reveal/Slide";
import Logo from "../../../images/parallax/logo/value.png";
import "./index.scss";

const ParallaxVision = (props) => {
  const { innovationData, allImages } = props;
  const missionImg = allImages.find(
    (val) => val.originalName === innovationData[0].mission_img
  );
  const visionImg = allImages.find(
    (val) => val.originalName === innovationData[0].vision_img
  );

  return (
    <Slide right duration={3000}>
      <div className="row parallax-vision-text">
        <div className="col-sm-2 offset-sm-2 org-val">
          <div className="parallax-vision-logo">
            <img src={Logo} alt="AAMC Logo" />
          </div>
        </div>
        <div className="col-sm-6 parallax-vision-org-left">
          <p>{innovationData[0].aamc_desc}</p>
        </div>
      </div>
      <div className="row parallax-vision-text">
        <div className="col-sm-2 offset-sm-3 parallax-org-val">
          <span>
            {missionImg && (
              <Img
                fluid={missionImg}
                srcSet={missionImg.srcSet}
                alt="mission"
                className="parallax-img-mission"
              />
            )}
          </span>
          <h2>{innovationData[0].mission_val}</h2>
          <p>{innovationData[0].mission_desc}</p>
        </div>
        <div className="col-sm-2 offset-sm-2 parallax-org-val">
          <span>
            {visionImg && (
              <Img
                fluid={visionImg}
                srcSet={visionImg.srcSet}
                alt="vision"
                className="parallax-img-vision"
              />
            )}
          </span>
          <h2>{innovationData[0].vision_val}</h2>
          <p>{innovationData[0].vision_desc}</p>
        </div>
      </div>
    </Slide>
  );
};

ParallaxVision.propTypes = {
  allImages: PropTypes.arrayOf(PropTypes.any),
  innovationData: PropTypes.arrayOf(PropTypes.any)
};

ParallaxVision.defaultProps = {
  allImages: [],
  innovationData: []
};

export default ParallaxVision;
