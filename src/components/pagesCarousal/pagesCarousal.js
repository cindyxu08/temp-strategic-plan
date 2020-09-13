import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import UpArrow from "../../images/page-carousal/up-arrow.svg";
import DownArrow from "../../images/page-carousal/down-arrow.svg";
import Vision from "./vision/vision";
import Values from "./values/values";
import Videos from "../../video/index";
import "./carosal.scss";

function Arrow(props) {
  const {
    type,
    nextImg,
    prevImg,
    onClick,
    clickHandler,
    isLast,
    isFirst
  } = props;

  let className = type === "next" ? "downArrow" : "upArrow";
  className = isLast || isFirst ? className : `${className} hideArrow`;
  const arrowButton =
    type === "next" ? (
      <img src={nextImg} alt="down arrow" />
    ) : (
      <img src={prevImg} alt="up arrow" />
    );
  if (!onClick) {
    return null;
  }
  return (
    <div
      tabIndex="0"
      role="button"
      className={className}
      onKeyDown={() => {
        if (type === "prev") {
          window.scrollTo(0, 0);
        }
        clickHandler();
      }}
      onClick={() => {
        if (type === "prev") {
          window.scrollTo(0, 0);
        }
        clickHandler();
      }}
    >
      {arrowButton}
    </div>
  );
}
class PagesCarousal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDisplay: 0
    };
    this.slider = React.createRef();
    this.sliderContainer = React.createRef();
    this.footerSection = null;
    this.totalCount = 0;
  }

  componentDidMount() {
    const {
      carousalImageData: {
        allHomePageCarousalJson: { nodes },
        allLandingPagesJson: { edges: allLandingPages }
      }
    } = this.props;

    const {
      carousalImageData: {
        allParallaxValuesJson: { edges: allParallaxValues }
      }
    } = this.props;
    this.totalCount = allLandingPages.length + nodes[0].data.length;

    if (allParallaxValues[0].node.data.org_val) {
      this.totalCount += 1;
    }
    if (
      allParallaxValues[0].node.data.mission_val ||
      allParallaxValues[0].node.data.vision_val
    ) {
      this.totalCount += 1;
    }

    const dots = document.getElementsByClassName("slick-dots")[0];
    if (dots) {
      dots.setAttribute("class", "slick-dots customDots");
    }

    this.sliderContainer.addEventListener("wheel", (e) => {
      const { currentDisplay } = this.state;
      if (currentDisplay + 1 < this.totalCount) {
        e.preventDefault();
      }
      if (e.deltaY < -40) {
        this.prevSlide();
      } else if (e.deltaY > 40) {
        this.nextSlide();
      }
    });

    document.addEventListener("keydown", (e) => {
      const { currentDisplay } = this.state;
      if (this.sliderContainer) {
        if (
          (e.keyCode === 38 || e.keyCode === 40) &&
          currentDisplay + 1 < this.totalCount
        ) {
          e.preventDefault();
        }
        if (e.keyCode === 40) {
          this.nextSlide();
        } else if (e.keyCode === 38) {
          this.prevSlide();
        }
      }
    });
    this.footerSection = document.getElementById("footer-section");
  }

  nextSlide = () => {
    this.slider.slickNext();
  };

  prevSlide = () => {
    this.slider.slickPrev();
  };

  createCarousalTiles = (data, images) => {
    return data.map((page, index) => {
      const img = images.find((val) => val.originalName === page.heroImageName);
      return (
        <div name={`image${index}`} className="imageContainer">
          {page.videoId ? (
            <div
              className="video-background-home-page"
              style={{
                backgroundImage: `linear-gradient(
         rgba(0, 0, 0, 0),
         rgba(0, 0, 0, 0.46) 46%,
         #000
       ))`
              }}
            >
              <video
                autoPlay
                loop
                muted
                className="pageCarousal-video-foreground"
              >
                <source src={Videos[page.videoId]} />
                <track
                  src="captions"
                  kind="captions"
                  label="english_captions"
                />
              </video>
            </div>
          ) : (
            <Img
              fluid={img}
              srcSet={img.srcSet}
              alt={`image_${img.originalName}`}
              className="image"
            />
          )}
          <div className="imageGradient">
            {page.path ? (
              <Link to={page.path} tabIndex="-1">
                <h2 className="imageOverlap">{page.title}</h2>
              </Link>
            ) : (
              <h2 className="imageOverlap">{page.title}</h2>
            )}
          </div>
        </div>
      );
    });
  };

  render() {
    let {
      carousalImageData: {
        allHomePageCarousalJson: { nodes },
        allFile: { edges: allImages },
        allLandingPagesJson: { edges: allLandingPages }
      }
    } = this.props;
    const {
      carousalImageData: {
        allParallaxValuesJson: { edges: allParallaxValues }
      }
    } = this.props;

    const innovationData = allParallaxValues.map(({ node }) => node.data);

    const { currentDisplay } = this.state;

    allImages = allImages.map(({ node }) => node);
    allLandingPages = allLandingPages
      .sort((a, b) => a.node.data.order - b.node.data.order)
      .map(({ node }, index) => {
        return { ...node.data, title: `Goal ${index + 1} ${node.data.title}` };
      });
    nodes = nodes[0].data.map((val) => {
      return {
        path: val.path,
        title: val.text,
        heroImageName: val.imageName,
        videoId: val.videoId
      };
    });
    allLandingPages = nodes.concat(allLandingPages);
    const settings = {
      infinite: false,
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 500,
      vertical: true,
      verticalSwiping: true,
      swipeToSlide: true,
      swipe: true,
      beforeChange: (curr, next) => {
        if (curr !== next) window.scrollTo(0, 0);
      },
      afterChange: (currentSlide) => {
        this.setState({ currentDisplay: currentSlide });
        if (currentSlide !== currentDisplay) window.scrollTo(0, 0);
      },
      swipeEvent: (direction) => {
        if (direction === "up") {
          this.nextSlide();
          if (this.footerSection && currentDisplay !== 0) {
            this.footerSection.scrollIntoView({ behavior: "smooth" });
          }
        } else if (direction === "down") this.prevSlide();
      },

      nextArrow: (
        <Arrow
          nextImg={DownArrow}
          clickHandler={this.nextSlide}
          type="next"
          isFirst={currentDisplay === 0}
        />
      ),
      prevArrow: (
        <Arrow
          prevImg={UpArrow}
          clickHandler={this.prevSlide}
          type="prev"
          isLast={currentDisplay === this.totalCount - 1}
        />
      )
    };
    allImages = allImages.map(({ childImageSharp }) => childImageSharp.fluid);
    return (
      <>
        <div
          ref={(c) => {
            this.sliderContainer = c;
          }}
          className="sliderHomePage"
        >
          <Slider
            ref={(c) => {
              this.slider = c;
            }}
            {...settings}
          >
            {this.createCarousalTiles(allLandingPages.slice(0, 1), allImages)}

            <Vision allImages={allImages} innovationData={innovationData} />
            <Values allImages={allImages} innovationData={innovationData} />
            {this.createCarousalTiles(allLandingPages.slice(1), allImages)}
          </Slider>
        </div>
      </>
    );
  }
}

Arrow.defaultProps = {
  type: undefined,
  nextImg: undefined,
  prevImg: undefined,
  onClick: undefined,
  clickHandler: undefined,
  isFirst: false,
  isLast: false
};
Arrow.propTypes = {
  type: PropTypes.string,
  nextImg: PropTypes.string,
  prevImg: PropTypes.string,
  onClick: PropTypes.func,
  clickHandler: PropTypes.func,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool
};

PagesCarousal.defaultProps = {
  carousalImageData: {}
};
PagesCarousal.propTypes = {
  carousalImageData: PropTypes.shape({
    allLandingPagesJson: PropTypes.shape(),
    allFile: PropTypes.shape(),
    allHomePageCarousalJson: PropTypes.shape(),
    allParallaxValuesJson: PropTypes.shape()
  })
};

export default PagesCarousal;
