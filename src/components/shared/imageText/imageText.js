import React from "react";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import "./imageText.scss";
import VideoPlayer from "../videoPlayer/videoPlayer";

const ImageText = (props) => {
  const {
    data: { image, text, videoId, youtubeId }
  } = props;
  const { hasLeftSideImage, landingPageVideo } = props;
  return (
    <>
      {hasLeftSideImage ? (
        <div
          className="row customRow"
          style={{
            backgroundColor: "#ffffff",
            backgroundImage: "linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%)"
          }}
        >
          <div className="col-md-5">
            {videoId || youtubeId ? (
              <VideoPlayer
                videoSrc={landingPageVideo[videoId]}
                youtubeId={youtubeId}
              />
            ) : (
              <Img
                fluid={image}
                srcSet={image.srcSet}
                alt={`${image.originalName}`}
                className="img-left img-fluid"
              />
            )}
          </div>
          <div className="col-md-7">
            <p className="img-text">{text}</p>
          </div>
        </div>
      ) : (
        <div className="row" style={{ backgroundColor: "#ffffff" }}>
          <div className="col-md-7">
            <p style={{ marginLeft: "5%" }} className="img-text">
              {text}
            </p>
          </div>
          <div className="col-md-5">
            {videoId || youtubeId ? (
              <VideoPlayer
                videoSrc={landingPageVideo[videoId]}
                youtubeId={youtubeId}
              />
            ) : (
              <Img
                fluid={image}
                srcSet={image.srcSet}
                alt={`${image.originalName}`}
                className="img-right img-fluid"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

ImageText.propTypes = {
  hasLeftSideImage: PropTypes.bool,
  landingPageVideo: PropTypes.shape(),
  data: PropTypes.shape()
};

ImageText.defaultProps = {
  hasLeftSideImage: true,
  landingPageVideo: "",
  data: {}
};

export default ImageText;
