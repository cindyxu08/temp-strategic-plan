import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import HeroArea from "./heroArea";

const parallexContainer = () => {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          dir: { regex: "/parallax/hero-area/" }
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
      allParallaxHomePageHeroAreaJson {
        edges {
          node {
            data {
              hero_name
              hero_name_data_lax_translate_y
              hero_name_data_lax_opacity
              hero_description
              hero_description_data_lax_opacity
              hero_description_data_lax_translate_y
              parallax_images {
                data_lax_translate_x
                data_lax_translate_y
                image_name
                image_order
              }
            }
          }
        }
      }
    }
  `);

  const allImages = data.allFile.edges.map(
    ({ node }) => node.childImageSharp.fluid
  );
  const heroData = data.allParallaxHomePageHeroAreaJson.edges.map(
    ({ node }) => node.data
  );

  return <HeroArea allImages={allImages} heroData={heroData} />;
};

export default parallexContainer;
