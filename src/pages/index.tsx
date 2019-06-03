import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/seo';
import PageHeader from '../components/page-header';
import PageFooter from '../components/page-footer';

interface Props {
  data: {
    file: {
      childImageSharp: {
        fluid: any;
      };
    };
    markdownRemark: {
      html: string;
    };
  };
}

const IndexPage = ({ data }: Props) => (
  <div>
    <SEO title="Home" />
    <PageHeader tab="/" />
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">
          South Sudan WASH Information Management System
        </h1>
        <Img fluid={data.file.childImageSharp.fluid} />
        <div
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          className="content"
        />
      </div>
    </section>
    <PageFooter />
  </div>
);

export const query = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
    }
    file(relativePath: { eq: "image-home.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 900) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export default IndexPage;
