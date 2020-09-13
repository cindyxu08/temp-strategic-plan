import React from "react";
import PropTypes from "prop-types";
import Slide from "react-reveal/Slide";
import Img from "gatsby-image";
import "./values.scss";

const Values = (props) => {
  const { innovationData, allImages, enableSlide } = props;
  const children = (
    <div className="values-container">
      <div className="row values-text">
        <div className="col-sm-4 offset-sm-4">
          <h2>{innovationData[0].org_val}</h2>
        </div>
      </div>
      <div className="row values-text">
        <div className="col-sm-8 offset-sm-2">
          <p>{innovationData[0].aamc_desc}</p>
        </div>
      </div>
      <div className="row values-text">
        {innovationData[0].innovation.map((data, index) => {
          const finalImg = allImages.find(
            (val) => val.originalName === data.imageName
          );

          let valClass;
          if (innovationData[0].innovation.length === 2 && index === 0) {
            valClass = "col-sm-5 col-xs-5 offset-sm-1 innovation-text";
          } else if (innovationData[0].innovation.length === 2 && index > 0) {
            valClass = "col-sm-5 col-xs-5 innovation-text";
          } else {
            valClass = "col-sm-8 col-xs-8 offset-sm-2 innovation-text";
          }

          return (
            <div className={valClass}>
              <span>
                {finalImg && (
                  <Img
                    fluid={finalImg}
                    srcSet={finalImg.srcSet}
                    alt={`image_${index}`}
                    className="img"
                  />
                )}
              </span>
              <h2>{data.values}</h2>
              <p>{data.description}</p>
            </div>
          );
        })}
        {innovationData[0].integrity.map((data, index) => {
          const finalImg = allImages.find(
            (val) => val.originalName === data.imageName
          );

          let valuesClass;
          if (innovationData[0].integrity.length === 3 && index === 0) {
            valuesClass = "col-sm-3 offset-sm-1";
          } else if (innovationData[0].integrity.length === 3 && index === 1) {
            valuesClass = "col-sm-4";
          } else if (innovationData[0].integrity.length === 3 && index > 0) {
            valuesClass = "col-sm-3";
          } else {
            valuesClass = "col-sm-6 offset-sm-1";
          }

          return (
            <div className={valuesClass}>
              {finalImg && (
                <Img
                  fluid={finalImg}
                  srcSet={finalImg.srcSet}
                  alt={`image_${index}`}
                  className="img"
                />
              )}
              <h2>{data.values}</h2>
              <p>{data.description}</p>
            </div>
          );
        })}
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
Values.propTypes = {
  allImages: PropTypes.arrayOf(PropTypes.any),
  innovationData: PropTypes.arrayOf(PropTypes.any),
  enableSlide: PropTypes.bool
};

Values.defaultProps = {
  allImages: [],
  innovationData: [],
  enableSlide: false
};
export default Values;
