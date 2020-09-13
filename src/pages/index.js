import React from "react";
import Layout from "../components/layout/layout";
import SEO from "../components/seo/seo";
import PagesCarousalData from "../components/pagesCarousal/pageData";
import "../styles/getstrap.scss";

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <PagesCarousalData />
    </Layout>
  );
};

export default IndexPage;
