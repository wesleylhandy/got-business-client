/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import Image from 'gatsby-image'
import styled from '@emotion/styled'
import { Global, css } from "@emotion/core"
import {FaRegCopyright, FaStackOverflow, FaTwitter, FaLinkedin, FaGithubSquare, FaRegEnvelope, FaYoutube, FaFacebook, FaInstagram, FaPhone} from 'react-icons/fa'

import Header from "./Header/Header"

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1 1 auto;
  min-height: calc(100vh - 340px);
`

const Footer = styled.footer`
  border-top: 5px solid #555;
  flex: 0 0 auto;
  max-height: 200px;
`

const FooterText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
  flex-wrap: wrap;
  line-height: 2;
`

const Pipe = styled.span`
  margin: 0 2px;
  @media screen and (max-width: 530px) {
    display: none;
  }
`
const InnerFlex = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SocialLinks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 30px auto;
  max-width: 300px;
`

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            author {
                name
            }
            socialLinks {
                twitter,
                linkedin,
                stackOverflow,
                email,
                github,
                facebook,
                instagram,
                youtube,
                phone
            }
          }
        }
        footerIcon: file(relativePath: {eq: "images/gatsby-icon.png"}) {
          childImageSharp {
            fluid(maxWidth:30){
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => {
      const { site: { siteMetadata: { title, siteUrl, author: { name }, socialLinks: { twitter, linkedin, stackOverflow, email, github, facebook, instagram, youtube, phone } } }, footerIcon } = data
      return (
        <>
          <Global
            styles={css`
              h1 > a {
                text-decoration: none;
              }
              a {
                background-color: transparent;
                -webkit-text-decoration-skip: objects;
                color: navy;
              }
              a[href^="/"],
              a[href*="http"],
              a[href*="mailto"],
              a[href*="tel:"] {
                transition: color 200ms ease-in-out,
                  text-shadow 200ms ease-in-out;
              }
              a[href^="/"]:hover {
                color: dodgerblue;
              }
              a[href*="http"]:hover,
              a[href*="mailto"]:hover,
              a[href*="tel:"]:hover {
                color: dodgerblue;
              }
              a:active,
              a:hover {
                outline-width: 0;
              }
              nav > a {
                transition: none !important;
              }
              nav > a:hover {
                color: white;
              }
            `}
          />
          <Header siteTitle={title} />
          <Container>
            <Main>{children}</Main>
            <Footer>
              <FooterText>
                <FaRegCopyright/>
                <span style={{marginLeft: "5px"}}>
                  {new Date().getFullYear()} {name}
                </span>
                <Pipe>|</Pipe>
                <Link to="/" style={{textAlign: "center"}}>{siteUrl}</Link>
                <Pipe>|</Pipe>
                <InnerFlex>
                  Built using&nbsp;
                  <a href="https://www.gatsbyjs.org" style={{width: "30px", height: "30px", display: "inline-block"}} alt="Gatsby">
                    <Image fluid={footerIcon.childImageSharp.fluid}/>
                  </a>
                </InnerFlex>
              </FooterText>
              <SocialLinks>
                {linkedin && <a href={linkedin} aria-label="LinkedIn"><FaLinkedin /></a>}
                {stackOverflow && <a href={stackOverflow} aria-label="Stack Overflow"><FaStackOverflow /></a>}
                {github && <a href={github} aria-label="Github"><FaGithubSquare /></a>}
                {twitter && <a href={twitter} aria-label="Twitter"><FaTwitter /></a>}
                {facebook && <a href={facebook} aria-label="Facebook"><FaFacebook /></a>}
                {instagram && <a href={instagram} aria-label="Instagram"><FaInstagram /></a>}
                {youtube && <a href={youtube} aria-label="Youtube"><FaYoutube /></a>}
                {email && <a href={email} aria-label="Email"><FaRegEnvelope/></a>}
                {phone && <a href={phone} aria-label="phone"><FaPhone/></a>}
              </SocialLinks>
            </Footer>
          </Container>
        </>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
