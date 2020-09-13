import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Layout from "../../components/Parallax/layout/layout";
import SEO from "../../components/seo/seo";
import HeroArea from "../../components/Parallax/landigPageHeroArea/landingPageheroArea";
import ImageText from "../../components/shared/imageText/imageText";
import Videos from "../../video/index";
import "./parallaxLandingPage.scss";

const PageTemplate = (props) => {
  const {
    path,
    pageContext: { pageData },
    data: { allFile }
  } = props;
  const allImages = allFile.edges.map(({ node }) => node.childImageSharp.fluid);
  // handle edge condition for no page data
  if (pageData) {
    pageData.goals = pageData.goals.map((goal) => {
      return {
        ...goal,
        image:
          allImages.filter(
            (image) => image.originalName === goal.imageName
          )[0] || {}
      };
    });
    pageData.heroImage = allImages.filter(
      (image) => image.originalName === pageData.parallax_heroImageName
    )[0];
  }

  return (
    <Layout path={path}>
      <SEO title={path.replace("/", "")} />
      <div>
        <HeroArea
          anchorLink="main"
          title={pageData && `Goal ${pageData.order} ${pageData.title}`}
          heroImage={pageData && pageData.heroImage}
          videoId={pageData && pageData.videoId}
          path={path}
          landingPageVideo={Videos}
        />
        <div id="main">
          {pageData &&
            pageData.goals.map((goal, index) => (
              <ImageText
                data={goal}
                hasLeftSideImage={index % 2 === 0}
                videoId={goal.videoId}
                landingPageVideo={Videos}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

PageTemplate.defaultProps = {
  data: {},
  path: "",
  pageContext: {}
};

PageTemplate.propTypes = {
  data: PropTypes.shape({
    allFile: PropTypes.shape()
  }),
  path: PropTypes.string,
  pageContext: PropTypes.shape()
};

export default PageTemplate;

export const LandingPageQuery = graphql`
  query ParallaxLandingPageQuery {
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
`;
