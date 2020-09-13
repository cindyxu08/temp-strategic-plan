import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout/layout";
import SEO from "../components/seo/seo";

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <div className="container" style={{ minHeight: "400px", marginTop: "15%" }}>
      <h3>Hi</h3>
      <p>This page will be coming soon</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  </Layout>
);

export default SecondPage;
