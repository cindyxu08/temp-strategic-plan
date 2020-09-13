import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import Slide from "react-reveal/Slide";
import "./vision.scss";

const Vision = (props) => {
  const { innovationData, allImages, enableSlide } = props;

  const missionImg = allImages.find(
    (val) => val.originalName === innovationData[0].mission_img
  );
  const visionImg = allImages.find(
    (val) => val.originalName === innovationData[0].vision_img
  );
  const children = (
    <div className="vision-container">
      <div className="row vision-text">
        <div className="col-md-3 offset-md-2 org-val">
          <span>
            {missionImg && (
              <Img
                fluid={missionImg}
                srcSet={missionImg.srcSet}
                alt="mission"
                className="img-mission"
              />
            )}
          </span>
          <h2>{innovationData[0].mission_val}</h2>
          <p>{innovationData[0].mission_desc}</p>
        </div>
        <div className="col-md-3 offset-md-2 org-val">
          <span>
            {visionImg && (
              <Img
                fluid={visionImg}
                srcSet={visionImg.srcSet}
                alt="vision"
                className="img-vision"
              />
            )}
          </span>
          <h2>{innovationData[0].vision_val}</h2>
          <p>{innovationData[0].vision_desc}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {enableSlide ? (
        <Slide right duration={3000}>
          {children}
        </Slide>
      ) : (
        children
      )}
    </>
  );
};

Vision.propTypes = {
  allImages: PropTypes.arrayOf(PropTypes.any),
  innovationData: PropTypes.arrayOf(PropTypes.any),
  enableSlide: PropTypes.bool
};

Vision.defaultProps = {
  allImages: [],
  innovationData: [],
  enableSlide: false
};

export default Vision;
