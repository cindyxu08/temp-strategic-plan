/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import ParallaxHeader from "../header/header";
import ParallaxFooter from "../footer/footer";
import "./layout.scss";
import Logo from "../../../images/logos/AAMC-logo.svg";

const ParallaxLayout = (props) => {
  const { children } = props;
  const data = useStaticQuery(graphql`
    query ParallaxLayoutPageQuery {
      site {
        siteMetadata {
          title
        }
      }
      allLandingPagesJson {
        edges {
          node {
            data {
              path
              title
              order
            }
          }
        }
      }
      allFooterJson {
        edges {
          node {
            quick_links {
              Resources {
                data {
                  name
                  path
                }
                title
              }
              Quick_Links {
                title
                data {
                  path
                  name
                }
              }
              Media {
                title
                data {
                  name
                  path
                }
              }
            }
            social_media {
              icon
              name
              url
            }
          }
        }
      }
    }
  `);

  const footerData = {};
  data.allFooterJson.edges.forEach(({ node }) => {
    if (node.quick_links) {
      footerData.quickLinks = node.quick_links;
    }
    if (node.social_media) footerData.socialMedia = node.social_media;
  });
  const { path } = props;

  return (
    <>
      {!path.includes("/parallax/") ? (
        <ParallaxHeader
          siteTitle={data.site.siteMetadata.title}
          siteLogo={Logo}
        />
      ) : null}

      {children}
      <ParallaxFooter
        siteTitle={data.site.siteMetadata.title}
        siteLogo={Logo}
        footerData={footerData}
      />
    </>
  );
};

ParallaxLayout.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string
};
ParallaxLayout.defaultProps = {
  path: ""
};

export default ParallaxLayout;
