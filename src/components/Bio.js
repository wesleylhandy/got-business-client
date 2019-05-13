/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from '@emotion/styled'
import {FaStackOverflow, FaTwitter, FaLinkedin, FaGithubSquare, FaRegEnvelope, FaYoutube, FaFacebook, FaInstagram, FaPhone} from 'react-icons/fa'

const BioCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    border: 2px solid #000;
    margin: 30px auto;
    @media screen and (max-width: 767px) {
        flex-direction: column;
    }
`

const BioText = styled.p`
    flex: 1 1 auto;
    margin: 0;
    padding: 0;
    @media screen and (max-width: 767px) {
        margin: 10px 0;
    }
`

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: auto 10px;
  height: 160px;
  @media screen and (max-width: 767px){
      flex-direction: row;
      height: auto;
      width: 360px;
      margin: 10px auto;
  }
`

function Bio({text}) {  
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author: {name}, socialLinks : {twitter, linkedin, github, stackOverflow, email, phone, facebook, instagram, youtube} } = data.site.siteMetadata
        return (
          <BioCard>
            <Image
              fixed={data.avatar.childImageSharp.fixed}
              alt={name}
              style={{
                marginRight: 20,
                marginBottom: 0,
                width: 100,
                borderRadius: `100%`,
                flexGrow: 0,
                flexShrink: 0,
                flexBasis: 100,
              }}
              imgStyle={{
                borderRadius: `50%`,
                marginBottom: 0,
              }}
            />
            <BioText>
                <span dangerouslySetInnerHTML={{__html: text.replace(name, `<strong>${name}</strong>`) + '&nbsp;'}}/>
                <a href={twitter}>
                    You should follow on Twitter
                </a>
            </BioText>
            <ContactLinks>
                {linkedin && <a href={linkedin} aria-label="LinkedIn"><FaLinkedin /></a>}
                {stackOverflow && <a href={stackOverflow} aria-label="Stack Overflow"><FaStackOverflow /></a>}
                {github && <a href={github} aria-label="Github"><FaGithubSquare /></a>}
                {twitter && <a href={twitter} aria-label="Twitter"><FaTwitter /></a>}
                {facebook && <a href={facebook} aria-label="Facebook"><FaFacebook /></a>}
                {instagram && <a href={instagram} aria-label="Instagram"><FaInstagram /></a>}
                {youtube && <a href={youtube} aria-label="Youtube"><FaYoutube /></a>}
                {email && <a href={email} aria-label="Email"><FaRegEnvelope/></a>}
                {phone && <a href={phone} aria-label="phone"><FaPhone/></a>}
            </ContactLinks>
          </BioCard>
        )
      }}
    />
  )
}

Bio.propTypes = {
  text: PropTypes.string,
}

Bio.defaultProps = {
  text: ``,
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(relativePath: {eq: "images/gatsby-icon.png"}) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
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
  }
`

export default Bio