import React from "react"
import moment from 'moment'

import { FaChevronRight, FaChevronLeft, FaLocationArrow, FaPhone, FaArrowLeft } from "react-icons/fa"
import { graphql, Link } from "gatsby"

import styled from "@emotion/styled"
import Layout from "../components/Layout"
import SEO from "../components/SEO/Seo"
import Sharing from "../components/Sharing"
import { BusinessCardContainer, CategoryContainer } from '../components/Containers'
import { PrimaryHeading } from '../components/Headings'
import { GoBack, Navigation, PrevLink, HomeLink, NextLink } from '../components/InnerNavigation'

const Card = styled.article`
  width: calc(100% - 40px);
  margin: 20px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
`

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 5px solid #747474;
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px 0;
  border-bottom: 5px solid #747474;
`

const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 20px;
`

const CardElement = styled.div`
  margin: 20px auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  a>svg {
    margin-right: 5px;
  }
`

export default function Template(props) {
  const { data, pageContext } = props
//   console.log({data, pageContext})
  const { 
    mongodbLocalbusinessesLicenses: {
      trade_name_of_business,
      owner_name_of_business, 
      business_classification, 
      business_mailing_address,
      mailing_city,
      mailing_state,
      mailing_zip_code,
      mailing_zip_4,
      business_phone_number,
      discovery_date,
    }, 
    site 
  } = data
  const siteTitle = site.siteMetadata.title
  const image = null
  if (image) {
    image.alt = ""
  }
  const { next, prev } = pageContext
  const pathName = `/businesses/${trade_name_of_business.toLowerCase().replace(/\s/g, "-")}`
  const BackIcon = FaChevronLeft
  const ForwardIcon = FaChevronRight
  const classifications = business_classification.split(" / ").map((classification, ind) => {
    const category = classification.toLowerCase().replace(/\s/g, "-")
    return (
      <Link
        key={`cat-${ind}`}
        to={`/categories/${category}`}
        aria-label={`Display Posts with tagged as ${classification}`}
      >
        {classification}
      </Link>
    )
  });
  const businessAddress = `${business_mailing_address}, ${mailing_city}, ${mailing_state},   ${mailing_zip_code}${mailing_zip_4 ? "-" + mailing_zip_4 : ''}`
  return (
    <Layout {...props} title={siteTitle}>
      <BusinessCardContainer>
        <SEO
          title={trade_name_of_business}
          description={`${trade_name_of_business} is a ${business_classification} classified business in ${mailing_city}`}
          image={image}
          pathname={pathName}
          isBlogPost={false}
        />
        <GoBack>
          <Link to={props.location.state.prevPath}><FaArrowLeft/>Go Back</Link>
        </GoBack>
        <Card>
          <CardHeader>
            <PrimaryHeading style={{color:"navy"}}>{trade_name_of_business}</PrimaryHeading>
          </CardHeader>
          <CardBody>
            <CardElement>
              <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessAddress)}&dir_action=navigate`} target="_blank" rel="noopener noreferrer">
                <FaLocationArrow/>{businessAddress}
              </a>
            </CardElement>
            <CardElement>
              <a href={`tel:${business_phone_number}`}>
                <FaPhone/>{business_phone_number}
              </a>
            </CardElement>
            <CardElement>
              {`Owned By ${owner_name_of_business}`}
            </CardElement>
            <CardElement>
              {`Founded On ${moment(new Date(parseInt(discovery_date))).format('ddd, MMM Do, YYYY')}`}
            </CardElement>
            <CategoryContainer>{classifications}</CategoryContainer>
          </CardBody>
          <CardFooter>
            <Sharing
              pathName={pathName}
              title={trade_name_of_business}
              siteUrl={site.siteMetadata.siteUrl}
            />
          </CardFooter>
        </Card>
        <Navigation>
          <PrevLink>
            {prev && (
              <Link to={`/businesses/${prev.trade_name_of_business.toLowerCase().replace(/\s/g, "-")}`}>
                <BackIcon /> {prev.trade_name_of_business}
              </Link>
            )}
          </PrevLink>
          <HomeLink>
            <Link
              to="/businesses/"
              style={{ textAlign: "center", display: "block" }}
            >
              All Posts
            </Link>
          </HomeLink>
          <NextLink>
            {next && (
              <Link className="link next" to={`/businesses/${next.trade_name_of_business.toLowerCase().replace(/\s/g, "-")}`}>
                {next.trade_name_of_business} <ForwardIcon />
              </Link>
            )}
          </NextLink>
        </Navigation>
      </BusinessCardContainer>
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
        mailing_state
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
