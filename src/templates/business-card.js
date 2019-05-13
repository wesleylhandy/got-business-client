import React from "react"

import { FaChevronRight, FaChevronLeft } from "react-icons/fa"
import { graphql, Link } from "gatsby"

import styled from "@emotion/styled"
import Layout from "../components/Layout"
import SEO from "../components/SEO/Seo"
import Sharing from "../components/Sharing"

const Card = styled.div`
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
`

const CardTitle = styled.h1`
  font-family: Arial, sans-serif;
  font-weight: 700;
  font-style: normal;
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
  width: 100%:
`

// const CardDate = styled.h2`
//   margin: 0;
//   margin-bottom: 10px;
//   padding: 0;
//   align-self: flex-end;
//   font-size: 24px;
//   width: 100%;
// `

const Navigation = styled.div`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
`
const PrevLink = styled.div`
  text-align: left;
`
const BlogLink = styled.div`
  text-align: center;
`

const NextLink = styled.div`
  text-align: right;
`

export default function Template(props) {
  const { data, pageContext } = props
//   console.log({data, pageContext})
  const { mongodbLocalbusinessesLicenses: {trade_name_of_business, business_classification, mailing_city}, site } = data
  const siteTitle = site.siteMetadata.title
  const image = null
  if (image) {
    image.alt = ""
  }
  const { next, prev } = pageContext
  const pathName = `/businesses/${trade_name_of_business.toLowerCase().replace(/\s/g, "-")}`
  const BackIcon = FaChevronLeft
  const ForwardIcon = FaChevronRight
  return (
    <Layout {...props} title={siteTitle}>
      <Card>
        <SEO
          title={trade_name_of_business}
          description={`${trade_name_of_business} is a ${business_classification} in ${mailing_city}`}
          image={image}
          pathname={pathName}
          isBlogPost={false}
        />
        <article className="blog-post">
          <CardHeader>
            <CardTitle>{trade_name_of_business}</CardTitle>
            <p>{business_classification}</p>
          </CardHeader>
          <Sharing
            pathName={pathName}
            title={trade_name_of_business}
            siteUrl={site.siteMetadata.siteUrl}
          />

          <Navigation>
            <PrevLink>
              {prev && (
                <Link to={`/businesses/${prev.trade_name_of_business.toLowerCase().replace(/\s/g, "-")}`}>
                  <BackIcon /> {prev.trade_name_of_business}
                </Link>
              )}
            </PrevLink>
            <BlogLink>
              <Link
                to="/businesses/"
                style={{ textAlign: "center", display: "block" }}
              >
                All Posts
              </Link>
            </BlogLink>
            <NextLink>
              {next && (
                <Link className="link next" to={`/businesses/${next.trade_name_of_business.toLowerCase().replace(/\s/g, "-")}`}>
                  {next.trade_name_of_business} <ForwardIcon />
                </Link>
              )}
            </NextLink>
          </Navigation>
        </article>
      </Card>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BusinessByMongoId($mongoId: String!) {
    site {
      siteMetadata {
        title
        social {
          twitter
          linkedin
        }
        siteUrl
      }
    }
    mongodbLocalbusinessesLicenses(mongodb_id: { eq: $mongoId}) {
        mongodb_id
        trade_name_of_business
        owner_name_of_business
        google_verified
        geocoded_column {
					type
          coordinates
        }
        geocoded_column_address
        geocoded_column_city
        geocoded_column_state
        geocoded_column_zip
        business_mailing_address
        mailing_city
        mailing_zip_code
        mailing_zip_4
        business_phone_number
        business_classification
        discovery_date
        naics
        govId
      }
  }
`
