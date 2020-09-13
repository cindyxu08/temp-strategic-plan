import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Bounce } from "react-reveal";
import "./planOfActions.scss";
import BackgroundImage from "../../../images/parallax/planOfActions/narrowMuddyRoad.jpg";

const ParallaxPlanOfActions = () => {
  const data = useStaticQuery(graphql`
    {
      allParallaxPlanOfActionsJson {
        nodes {
          data {
            planOfAction_description
            planOfAction_list
            planOfAction_title
          }
        }
      }
      allFile(
        filter: {
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          dir: { regex: "/parallax/planOfActions/" }
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
  const planOfActionsData = data.allParallaxPlanOfActionsJson.nodes[0].data;
  const [isExpanded, setExpanded] = useState(false);
  return (
    <div
      id="planOfAction"
      className="parallax-palanOfActions-wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <Bounce bottom delay={500} duration={1500}>
        <div className="parallax-palanOfActions">
          <div className="planOfActions-heading">
            <h2 className="planOfActions-heading-title">
              {planOfActionsData.planOfAction_title}
            </h2>
            <div className="planOfActions-heading-description">
              {!isExpanded &&
              planOfActionsData.planOfAction_description.length > 250
                ? `${planOfActionsData.planOfAction_description.slice(
                    0,
                    250
                  )}...`
                : planOfActionsData.planOfAction_description}
            </div>
            {planOfActionsData.planOfAction_description.length > 250 && (
              <div
                className="planOfActions-heading-read-more"
                role="button"
                tabIndex="0"
                onKeyPress={() => {
                  setExpanded(!isExpanded);
                }}
                onClick={() => {
                  setExpanded(!isExpanded);
                }}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </div>
            )}
          </div>
          <div className="planOfActions-list">
            <div className="palanOfActions-top-left" />

            <ul>
              {planOfActionsData.planOfAction_list.map((val) => (
                <li>{val}</li>
              ))}
            </ul>
            <div className="palanOfActions-bottom-right" />
          </div>
        </div>
      </Bounce>
    </div>
  );
};

export default ParallaxPlanOfActions;
