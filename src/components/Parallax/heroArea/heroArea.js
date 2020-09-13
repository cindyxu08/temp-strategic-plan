import React from "react";
import PropTypes from "prop-types";
import { useLax } from "use-lax";

import "./heroArea.scss";

const ParallaxHeroArea = (props) => {
  useLax();
  const { heroData, allImages } = props;

  const newImages = heroData[0].parallax_images.map((data) => {
    const parallaxImg = allImages.find(
      (val) => val.originalName === data.image_name
    );
    return { ...data, parallaxImg };
  });
  return (
    <div className="parallax-heroArea-bg">
      <div className="parallax-hero-wrapper">
        <h2
          className="lax"
          data-lax-translate-y={heroData[0].hero_name_data_lax_translate_y}
          data-lax-opacity={heroData[0].hero_name_data_lax_opacity}
        >
          {heroData[0].hero_name}
        </h2>
        <h1
          className="lax"
          data-lax-translate-y={
            heroData[0].hero_description_data_lax_translate_y
          }
          data-lax-opacity={heroData[0].hero_description_data_lax_opacity}
        >
          {heroData[0].hero_description}
        </h1>
      </div>
      <div>
        {newImages.map((data, index) => {
          const imageData = data.parallaxImg;
          return (
            <img
              src={imageData.src}
              srcSet={imageData.srcSet}
              alt={`image_${index + 1}`}
              className={`mount${index + 1} lax`}
              data-lax-translate-y={data.data_lax_translate_y}
              data-lax-translate-x={data.data_lax_translate_x}
            />
          );
        })}
      </div>
    </div>
  );
};

ParallaxHeroArea.defaultProps = {
  heroData: {},
  allImages: []
};

ParallaxHeroArea.propTypes = {
  heroData: PropTypes.arrayOf(PropTypes.any),
  allImages: PropTypes.arrayOf(PropTypes.any)
};

export default ParallaxHeroArea;
