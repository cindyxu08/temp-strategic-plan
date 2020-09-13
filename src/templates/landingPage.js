import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Layout from "../components/layout/layout";
import SEO from "../components/seo/seo";
import HeroArea from "../components/heroArea/heroArea";
import ImageText from "../components/shared/imageText/imageText";
import OurPlanCarousal from "../components/ourPlanCarousal/ourPlanCarousal";
import Videos from "../video/index";
import "./landingPage.scss";

const PageTemplate = (props) => {
  const {
    path,
    pageContext: { pageData },
    data: { allLandingPagesJson, allFile }
  } = props;
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
      (image) => image.originalName === pageData.heroImageName
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
        <OurPlanCarousal
          title="Our Plans"
          data={carousalData}
          carousalVideo={Videos}
        />
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
    allLandingPagesJson: PropTypes.shape(),
    allFile: PropTypes.shape()
  }),
  path: PropTypes.string,
  pageContext: PropTypes.shape()
};

export default PageTemplate;

export const LandingPageQuery = graphql`
  query LandingPageQuery {
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
              youtubeId
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
`;
