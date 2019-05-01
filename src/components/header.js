import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const SiteHeader = ({ siteTitle }) => (
  <Header>
    <Container>
      <Heading>
        <SiteLink to="/">{siteTitle}</SiteLink>
      </Heading>
    </Container>
  </Header>
);

SiteHeader.propTypes = {
  siteTitle: PropTypes.string
};

SiteHeader.defaultProps = {
  siteTitle: ``
};

const Header = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 1.45rem 1.0875rem;
`;

const Heading = styled.h1`
  margin: 0;
`;

const SiteLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

export default SiteHeader;
