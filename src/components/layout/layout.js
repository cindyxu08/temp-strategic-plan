/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../header/header";
import Footer from "../footer/footer";
import "./layout.module.scss";
import Logo from "../../images/logos/AAMC-logo.svg";

const Layout = (props) => {
  const { children, path } = props;
  const data = useStaticQuery(graphql`
    query LayoutPageQuery {
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
  const dropdownData = data.allLandingPagesJson.edges
    .map(({ node }) => node.data)
    .sort((a, b) => a.order - b.order);

  const footerData = {};
  data.allFooterJson.edges.forEach(({ node }) => {
    if (node.quick_links) {
      footerData.quickLinks = node.quick_links;
    }
    if (node.social_media) footerData.socialMedia = node.social_media;
  });
  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
        siteLogo={Logo}
        dropdownData={dropdownData}
        path={path}
      />
      {children}
      <Footer
        siteTitle={data.site.siteMetadata.title}
        footerData={footerData}
        siteLogo={Logo}
      />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string
};
Layout.defaultProps = {
  path: "/"
};

export default Layout;
