/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, Link, graphql } from "gatsby";

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

        return (
          <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <section
              style={{
                display: `flex`,
                flexDirection: `row`
              }}
            >
              <div
                style={{
                  padding: `0 0 0 2%`,
                  width: `250px`,
                  display: `flex`,
                  flexDirection: `column`
                }}
              >
                <h5
                  style={{
                    marginBottom: "8px"
                  }}
                >
                  Posts
                </h5>
                {blogPosts.map(post => (
                  <div
                    key={post.slug}
                    style={{
                      display: `flex`,
                      flexDirection: `row`,
                      width: "100%"
                    }}
                  >
                    <Link
                      to={post.slug}
                      style={{
                        width: "80%",
                        fontSize: "0.8em",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: "0 10px 0 0"
                      }}
                    >
                      {post.title}
                    </Link>
                    <span
                      style={{
                        fontSize: "0.6em",
                        alignSelf: "flex-end"
                      }}
                    >
                      {post.date}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  width: `75%`,
                  padding: `0px 2%`,
                  paddingTop: 0
                }}
              >
                <main>{children}</main>
                <footer>© {new Date().getFullYear()} TeamClerks</footer>
              </div>
            </section>
          </>
        );
      }}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
