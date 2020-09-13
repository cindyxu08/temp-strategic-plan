import React from "react";
import { MDBIcon } from "mdbreact";

const SocialMedia = ({ data }) => data.map((f) => (
  <a key={f.url} href={f.url} className="fb-ic mr-3">
    <MDBIcon fab icon={f.icon} />
  </a>
));
SocialMedia.propTypes = {};

SocialMedia.defaultProps = {};
export default SocialMedia;
