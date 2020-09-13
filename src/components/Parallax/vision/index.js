import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useLax } from "use-lax";
import ParallaxVision from "./vision";
import ParallxValues from "./values";
import "./index.scss";

const ParallxVisionStatement = () => {
  useLax();

  const data = useStaticQuery(graphql`
    {
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
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          dir: { regex: "/parallax/" }
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

  const allImages = data.allFile.edges.map(
    ({ node }) => node.childImageSharp.fluid
  );
  const innovationData = data.allParallaxValuesJson.edges.map(
    ({ node }) => node.data
  );
  // const [scroll, setScroll] = useState(null);
  // useEffect(() => {
  //   document.addEventListener("scroll", () => {
  //     let scrollCheck = null;

  //     if (window.scrollY > 100 && window.scrollY < 300) {
  //       scrollCheck = true;
  //     } else if (window.scrollY >= 300 && window.scrollY < 850) {
  //       scrollCheck = false;
  //     }
  //     if (scrollCheck !== scroll) {
  //       setScroll(scrollCheck);
  //     }
  //   });
  // });

  return (
    <>
      {/* {scroll === null ? null : (
        <div className="lax" data-lax-translate-y="0 0, 800 1000">
          {scroll ? (
            <div className="visionBg">
              <ParallaxVision
                allImages={allImages}
                innovationData={innovationData}
              />
            </div>
          ) : (
            <div className="valuesBg">
              <ParallxValues
                allImages={allImages}
                innovationData={innovationData}
              />
            </div>
          )}
        </div>
      )} */}
      <div className="visionBg">
        <ParallaxVision allImages={allImages} innovationData={innovationData} />
      </div>
      <div className="valuesBg">
        <ParallxValues allImages={allImages} innovationData={innovationData} />
      </div>
    </>
  );
};

export default ParallxVisionStatement;
