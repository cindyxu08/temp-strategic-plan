import React from "react";
import { PropTypes } from "prop-types";
import ParallaxLayout from "../components/Parallax/layout/layout";
import SEO from "../components/seo/seo";
import ParallaxHeroArea from "../components/Parallax/heroArea/index";
import ParallaxVisionStatement from "../components/Parallax/vision/index";
import ParallaxPlanOfActions from "../components/Parallax/planOfActions/planOfActions";
import ParallaxGoalsCarousal from "../components/Parallax/goalsCarousal/goalsCarousal";

import "../styles/getstrap.scss";

const HomePage = (props) => {
  const { path } = props;
  return (
    <ParallaxLayout path={path}>
      <SEO title="Home" />
      <ParallaxHeroArea />
      <ParallaxVisionStatement />
      <ParallaxPlanOfActions />
      <ParallaxGoalsCarousal />
    </ParallaxLayout>
  );
};

HomePage.propTypes = {
  path: PropTypes.string
};
HomePage.defaultProps = {
  path: ""
};

export default HomePage;
