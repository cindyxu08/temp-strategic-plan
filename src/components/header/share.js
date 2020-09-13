import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDBIcon } from "mdbreact";
import {
  TwitterShareButton,
  FacebookShareButton,
  RedditShareButton,
  TumblrShareButton
} from "react-share";

import "./share.scss";

const Share = () => (
  <StaticQuery
    query={graphql`
      {
        headerJson {
          media_share {
            facebook {
              icon
              name
              url
            }
            reddit {
              icon
              name
              title
              url
            }
            tumblr {
              caption
              name
              posttype
              tags
              title
              url
            }
            twitter {
              hashtags
              icon
              name
              title
              url
              via
            }
          }
        }
      }
    `}
    render={(data) => {
      const {
        headerJson: {
          media_share: { twitter, facebook, reddit, tumblr }
        }
      } = data;
      return (
        <div className="post-social dropdown-item">
          <FacebookShareButton
            url={facebook.url}
            className="button is-outlined is-rounded facebook is-hovered"
          >
            <span className="icon">
              <MDBIcon fab icon={facebook.icon} />
            </span>
          </FacebookShareButton>
          <TwitterShareButton
            url={twitter.url}
            className="button is-outlined is-rounded twitter is-hovered"
            title={twitter.title}
            via={twitter.via.split("@").join("")}
            hashtags={twitter.hashtags}
          >
            <span className="icon">
              <MDBIcon fab icon={twitter.icon} />
            </span>
          </TwitterShareButton>
          <RedditShareButton
            url={reddit.url}
            className="button is-outlined is-rounded reddit is-hovered"
            title={reddit.title}
          >
            <span className="icon">
              <MDBIcon fab icon={reddit.icon} />
            </span>
          </RedditShareButton>
          <TumblrShareButton
            url={tumblr.url}
            title={tumblr.title}
            tags={tumblr.tags}
            caption={tumblr.caption}
            posttype={tumblr.posttype}
          >
            <span className="icon">
              <MDBIcon fab icon="tumblr" />
            </span>
          </TumblrShareButton>
        </div>
      );
    }}
  />
);

export default Share;
