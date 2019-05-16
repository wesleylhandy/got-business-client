import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/SEO/Seo"

import { PrimaryHeading, SubHeading } from '../components/Headings'

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
        bodyImg: file(relativePath: { eq: "images/local-business.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 980) {
              ...GatsbyImageSharpFluid
              src
            }
          }
        }
      }
    `}
    render={data => {
      const { ogImg, bodyImg, site: {siteMetadata: {title, description, author: {name}}}} = data
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
          <Img fluid={bodyImg.childImageSharp.fluid} alt="Local emblazened on a downtown Marquee"/>
          <p>This app is a proof of concept for a bigger project in the works for promoting local business.</p> 
          <p>The current app is built from a large dataset a collection of Business Licenses awarded in 2018 in the City of Virginia Beach. I am currently storing a copy of the dataset in a MongoDB collection, which is the source for this app. I have a Node.js API for gathering updates to this dataset and transforming for this project.</p>
          <p>From this dataset, this app generates a list of categories, create pages from those categories, creates both an infinite scrolling list of businesses as well as a paginated alphabetical list of businesses, and finally a page dedicated to each business. In all, there are over 2400 static pages on this site.</p>
          <p>Maps on the site are generated from Google Maps. This site is generated via Gatsby.js and hosted on Netlify.</p>
        </Layout>
      )
    }}
  />
)

export default IndexPage
