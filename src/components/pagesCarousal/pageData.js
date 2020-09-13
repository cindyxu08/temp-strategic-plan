import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PagesCarousal from "./pagesCarousal";

export default () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          dir: { regex: "/landing-pages|page-carousal|parallax/" }
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
      allHomePageCarousalJson {
        nodes {
          data {
            imageName
            text
            path
            videoId
          }
        }
      }
      allLandingPagesJson {
        edges {
          node {
            data {
              path
              title
              order
              heroImageName
            }
          }
        }
      }
      allParallaxValuesJson {
        edges {
          node {
            data {
              aamc_desc
              innovation {
                description
                imageName
                values
              }
              integrity {
                description
                imageName
                values
              }
              mission_desc
              mission_img
              mission_val
              org_val
              org_desc
              vision_desc
              vision_img
              vision_val
            }
          }
        }
      }
    }
  `);
  return <PagesCarousal carousalImageData={data} />;
};
