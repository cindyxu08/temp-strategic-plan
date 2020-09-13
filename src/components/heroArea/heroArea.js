import React from "react";
import PropTypes from "prop-types";
import PageScroll from "./pageScroll";
import "./heroArea.scss";

const HeroArea = (props) => {
  const { heroImage, title, anchorLink, videoId, landingPageVideo } = props;
  const currentVideo = landingPageVideo[videoId];
  return (
    <div>
      {videoId ? (
        <div className="heroArea">
          <video autoPlay loop muted className="heroArea-video-overlay">
            <source src={currentVideo} />
            <track src="captions" kind="captions" label="english_captions" />
          </video>
        </div>
      ) : (
        <div
          className="heroArea"
          style={{
            backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.46) 46%,
            #000
          ), url(${heroImage.src})`
          }}
        >
          <div className="page-overlay">
            <PageScroll title={title} anchorLink={anchorLink} />
          </div>
        </div>
      )}
    </div>
  );
};

HeroArea.propTypes = {
  title: PropTypes.string,
  heroImage: PropTypes.shape(),
  anchorLink: PropTypes.string,
  videoId: PropTypes.string,
  landingPageVideo: PropTypes.string
};

HeroArea.defaultProps = {
  title: "",
  heroImage: {},
  anchorLink: "",
  videoId: "",
  landingPageVideo: ""
};

export default HeroArea;
