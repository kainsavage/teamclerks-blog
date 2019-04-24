import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

function IndexPage(props) {
  return (
    <Layout>
      <SEO title="Home" keywords={[`teamclerks`]} />
      <h1>Welcome</h1>
      <p>
        TeamClerks is an entity I founded around 2001. Originally, it was a
        gaming clan amongst my close friends. Eventually, it grew into a
        side-business (I built and sold custom gaming computers for a while
        during college).
      </p>

      <p>I am unsure what TeamClerks is today.</p>

      <p>
        Currently, I am treating it as my personal development sandbox to try
        out new technologies and implement ideas I have. This site, for
        instance, is a blog I built using React as the front-end because I
        wanted to try it out.
      </p>

      <p>
        This website is also the home of{" "}
        <Link to="/historyblock">HistoryBlock</Link>.
      </p>
    </Layout>
  );
}

export default IndexPage;
