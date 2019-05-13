import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO/Seo"
// import Bio from "../components/Bio"
// import BlogPostList from "../components/BlogPostList"
import {PrimaryHeading, SubHeading } from '../components/Headings'
// import LinkContainer from '../components/LinkContainer'

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author {
                name
            }
          }
        }  
        ogImg: file(relativePath: { eq: "images/og.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
              src
            }
          }
        }
      }
    `}
    render={data => {
      const { ogImg, site: {siteMetadata: {title, description, author: {name}}}} = data
      return (
        <Layout>
          <SEO
            title="Home"
            keywords={["gatsby", "blog", "mongodb"]}
            image={{
              src: ogImg.childImageSharp.fluid.src,
              height: "1200",
              width: "630",
              alt: `` // give relevant 
            }}
            author={name}
          />
          <PrimaryHeading style={{marginBottom: "0"}}>{title}</PrimaryHeading>
          <SubHeading style={{margin: "5px 0 30px 0"}}>{description}</SubHeading>
        </Layout>
      )
    }}
  />
)

export default IndexPage
