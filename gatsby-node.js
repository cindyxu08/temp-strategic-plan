/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const pageTemplate = path.resolve("src/templates/landingPage.js");
  const parallaxPageTemplate = path.resolve(
    "src/templates/parallax/parallaxLandingPage.js"
  );

  return graphql(`
    {
      allLandingPagesJson {
        edges {
          node {
            data {
              path
              title
              order
              heroImageName
              parallax_heroImageName
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
    }
  `).then((res) => {
    if (!res.errors) {
      return res.data.allLandingPagesJson.edges.forEach(({ node }) => {
        createPage({
          path: node.data.path,
          context: {
            pageData: node.data
          },
          component: pageTemplate
        });
        createPage({
          path: `/parallax${node.data.path}`,
          context: {
            pageData: node.data
          },
          component: parallaxPageTemplate
        });
      });
    }
    return Promise.reject(res.errors);
  });
};
