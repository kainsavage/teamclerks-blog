import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

import "./blogTemplate.css";

export default function Template(props) {
  const { markdownRemark } = props.data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Layout>
      <SEO title="Home" keywords={[`teamclerks`]} />
      <div className="blog-post-container">
        <div className="blog-post">
          <Title>{frontmatter.title}</Title>
          <Author>
            <Icon name="user" /> {frontmatter.author}
          </Author>
          <PublishDate>
            <Icon name="calendar alternate" /> {frontmatter.date.split(" ")[0]}
          </PublishDate>
          <Post
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        path
        title
        author
      }
    }
  }
`;

const Title = styled.h1`
  margin-bottom: 8px;
`;

const Author = styled.h4`
  display: inline;
  margin-right: 22px;
`;

const PublishDate = styled.h4`
  display: inline;
`;

const Post = styled.div`
  margin-top: 10px;
`;
