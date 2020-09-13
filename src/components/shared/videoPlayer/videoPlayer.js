import React from "react";
import PropTypes from "prop-types";
import "./videoPlayer.scss";

const VideoPlayer = ({ videoSrc, youtubeId }) => {
  let video = null;
  if (videoSrc) {
    video = (
      <div className="imageText-video-margin">
        <video autoPlay loop muted className="imageText-video-foreground">
          <source src={videoSrc} />
          <track src="captions" kind="captions" label="english_captions" />
        </video>
      </div>
    );
  } else if (youtubeId) {
    video = (
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?rel=0&autoplay=${false}&loop=${false}&showinfo=0&controls=1&mute=${false}&playlist=${youtubeId}`}
        frameBorder="0"
        className="videoPlayer"
        allowFullScreen
        title="youtube video"
      />
    );
  }
  return video;
};

VideoPlayer.propTypes = {
  videoSrc: PropTypes.string,
  youtubeId: PropTypes.string
};
VideoPlayer.defaultProps = {
  videoSrc: "",
  youtubeId: ""
};

export default VideoPlayer;
