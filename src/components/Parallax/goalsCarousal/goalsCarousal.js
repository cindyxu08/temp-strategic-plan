import React from "react";
import "./goalsCarousal.scss";
import { useStaticQuery, graphql, Link } from "gatsby";
import makeCarousel from "react-reveal/makeCarousel";
// we'll need the Slide component for sliding animations
// but you can use any other effect
import Slide from "react-reveal/Slide";
// we'll use styled components for this tutorial
// but you can use any other styling options ( like plain old css )
import styled, { css } from "styled-components";

const ParallaxGoalsCarousal = () => {
  const data = useStaticQuery(graphql`
    {
      allLandingPagesJson {
        edges {
          node {
            data {
              path
              title
              order
              heroImageName
              description
              videoId
              goals {
                imageName
                text
                title
                videoId
              }
            }
          }
        }
      }
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          dir: { regex: "/landing-pages/" }
        }
      ) {
        edges {
          node {
            childImageSharp {
              fluid {
                originalName
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  `);

  const { allLandingPagesJson, allFile } = data;

  const AllPagesData = allLandingPagesJson.edges.map(({ node }) => node.data);
  const allImages = allFile.edges.map(({ node }) => node.childImageSharp.fluid);
  // handle edge condition for no page data
  const carousalData = AllPagesData.sort((a, b) => a.order - b.order).map(
    (val, index) => {
      return {
        path: val.path,
        title: `Goal ${index + 1} ${val.title || ""}`,
        videoId: val.videoId,
        image:
          allImages.filter(
            (image) => image.originalName === val.heroImageName
          )[0] || {}
      };
    }
  );
  const width = "1000px",
    height = "750px";
  const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: ${width};
    height: ${height};
    color: #fff;
  `;
  const Arrow = styled.div`
    text-shadow: 1px 1px 1px #fff;
    z-index: 100;
    line-height: ${height};
    text-align: center;
    position: absolute;
    top: 0;
    width: 10%;
    font-size: 3em;
    cursor: pointer;
    user-select: none;
    ${(props) =>
      props.right
        ? css`
            left: 90%;
          `
        : css`
            left: 0%;
          `}
  `;

  const CarouselUI = ({ position, handleClick, children }) => (
    <Container>
      <div> {children}</div>
      <div className="goals-carousal">
        <span className="goals-carousal-num">
          {position < 10
            ? "0" + (position + 1) + "/0" + carousalData.length
            : (position + 1) / carousalData.length}
        </span>
        <Arrow
          className="goals-leftArrow arrowL-responsive"
          onClick={handleClick}
          data-position={position - 1}
        >
          {"<"}
        </Arrow>
        <Arrow
          className="goals-rightArrow arrowR-responsive"
          right
          onClick={handleClick}
          data-position={position + 1}
        >
          {">"}
        </Arrow>
      </div>
    </Container>
  );
  const Carousel = makeCarousel(CarouselUI);
  return (
    <div className="row goalsBg">
      <div className="wrapper">
        <Carousel>
          {carousalData.map((val, index) => {
            return (
              <Slide right>
                <div
                  className="card-body goals-text"
                  style={{ width: "1000px" }}
                >
                  <h4 className="card-title goalsContent-first">{index + 1}</h4>
                  <p className="card-text goalsContent-text">{val.title}</p>
                  <p className="card-text goalsContent-text">
                    <Link
                      className="goals-readmore"
                      to={`/parallax${val.path}`}
                    >
                      Read More
                    </Link>
                    {/* <span className="goals-readmore">Read More</span> */}
                  </p>
                </div>
              </Slide>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default ParallaxGoalsCarousal;
