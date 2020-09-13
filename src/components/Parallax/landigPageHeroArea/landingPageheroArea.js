import React from "react";
import PropTypes from "prop-types";
import "./landingPageheroArea.scss";

const HeroArea = (props) => {
  const { heroImage, title, videoId, landingPageVideo } = props;
  const currentVideo = landingPageVideo[videoId];
  return (
    <div>
      {videoId ? (
        <div className="heroArea">
          <video
            autoPlay
            loop
            muted
            className="parallax-landingPage-heroArea-video-overlay"
          >
            <source src={currentVideo} />
            <track src="captions" kind="captions" label="english_captions" />
          </video>
          <div className="landingPage-hereArea-page-overlay">
            <h2>{title}</h2>
          </div>
        </div>
      ) : (
        <div
          className="parallax-landingPage-heroArea"
          style={{
            backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.46) 46%,
            #000
          ), url(${heroImage.src})`
          }}
        >
          <div className="landingPage-hereArea-page-overlay">
            <h2>{title}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

HeroArea.propTypes = {
  heroImage: PropTypes.shape(),
  videoId: PropTypes.string,
  title: PropTypes.string,
  landingPageVideo: PropTypes.string
};

HeroArea.defaultProps = {
  heroImage: {},
  videoId: "",
  title: "",
  landingPageVideo: ""
};

export default HeroArea;
