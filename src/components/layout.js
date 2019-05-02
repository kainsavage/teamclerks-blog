/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, Link, graphql } from "gatsby";
import styled from "styled-components";

import Header from "./header";
import "./layout.css";

import "prismjs/plugins/line-numbers/prism-line-numbers.css";

function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
          allSitePage {
            edges {
              node {
                path
                fields {
                  slug
                  title
                  date
                }
              }
            }
          }
        }
      `}
      render={data => {
        const blogPosts = data.allSitePage.edges
          .filter(obj => obj.node.fields && obj.node.fields.slug)
          .map(obj => obj.node.fields);

        blogPosts.sort((a, b) => {
          return a.date > b.date ? -1 : b.date > a.date ? 1 : 0;
        });

        return (
          <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <Section>
              <LeftNav>
                <PostHeader>Posts</PostHeader>
                {blogPosts.map(post => (
                  <Post key={post.slug}>
                    <PostLink to={post.slug}>{post.title}</PostLink>
                    <PostDate>{post.date}</PostDate>
                  </Post>
                ))}
              </LeftNav>
              <Main>
                <main>{children}</main>
                <footer>© {new Date().getFullYear()} TeamClerks</footer>
              </Main>
            </Section>
          </>
        );
      }}
    />
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: row;
`;

const LeftNav = styled.div`
  padding: 0 0 0 2%;
  width: 250px;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  width: 75%;
  padding: 0px 2%;
  padding-top: 0;
`;

const PostHeader = styled.h5`
  margin-bottom: 8px;
`;

const Post = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const PostLink = styled(Link)`
  width: 80%;
  font-size: 0.8em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding 0 10px 0 0;
`;

const PostDate = styled.span`
  font-size: 0.6em;
  align-self: flex-end;
`;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
