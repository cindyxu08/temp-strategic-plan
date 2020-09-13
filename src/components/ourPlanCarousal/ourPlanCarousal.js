import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import Slider from "react-slick";
import PropTypes from "prop-types";
import NextArrow from "../../images/landing-page-carousal/right-arrow.svg";
import PrevArrow from "../../images/landing-page-carousal/left-arrow.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ourPlanCarousal.scss";

function Arrow(props) {
  const { type, nextImg, prevImg, onClick: customClick } = props;
  let className = type === "next" ? "nextArrow" : "prevArrow";
  className += " arrow";
  const arrowButton =
    type === "next" ? (
      <img src={nextImg} alt="left arrow" />
    ) : (
      <img src={prevImg} alt="left arrow" />
    );
  if (!customClick) {
    return null;
  }
  return (
    <div
      tabIndex="0"
      role="button"
      className={className}
      onKeyDown={() => {
        customClick();
      }}
      onClick={() => {
        customClick();
      }}
    >
      {arrowButton}
    </div>
  );
}

class OurPlanCarousal extends React.Component {
  renderContent = (data, carousalVideo) =>
    data.map((tile, index) => (
      <Link to={tile.path}>
        <div key={tile} className="each-carousal">
          <div className="each-carousal-img">
            {tile.videoId ? (
              <div className="landingPage-video-margin">
                <video
                  preload="metadata"
                  className="landingPage-video-foreground"
                >
                  <source src={`${carousalVideo[tile.videoId]}#t=0.1`} />
                  <track
                    src="captions"
                    kind="captions"
                    label="english_captions"
                  />
                </video>
              </div>
            ) : (
              <Img
                fluid={tile.image}
                srcSet={tile.image.srcSet}
                alt={`image_${index}`}
                className="image"
              />
            )}
          </div>
          <div className="each-carousal-title">{tile.title}</div>
        </div>
      </Link>
    ));

  render() {
    const { title, data, carousalVideo } = this.props;
    const settings = {
      infinite: true,
      dots: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      speed: 500,
      swipeToSlide: true,
      nextArrow: <Arrow nextImg={NextArrow} type="next" />,
      prevArrow: <Arrow prevImg={PrevArrow} type="prev" />,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    return (
      <div className="ourPlanCarousal">
        <h2>{title}</h2>
        <div className="slider">
          <Slider {...settings}>
            {this.renderContent(data, carousalVideo)}
          </Slider>
        </div>
      </div>
    );
  }
}
OurPlanCarousal.defaultProps = {
  data: [],
  title: "",
  carousalVideo: ""
};

OurPlanCarousal.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  carousalVideo: PropTypes.shape(),
  title: PropTypes.string
};

Arrow.defaultProps = {
  type: undefined,
  nextImg: undefined,
  prevImg: undefined,
  onClick: undefined
};
Arrow.propTypes = {
  type: PropTypes.string,
  nextImg: PropTypes.string,
  prevImg: PropTypes.string,
  onClick: PropTypes.func
};

export default OurPlanCarousal;
