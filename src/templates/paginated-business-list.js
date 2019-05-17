import React, { useState } from "react"
import { Link, navigate, graphql } from "gatsby"
import { FaHome, FaTags, FaArrowLeft, FaChevronRight, FaChevronLeft } from "react-icons/fa"
import Map from '../components/Map'
import Layout from "../components/layout"
import { LinkContainer } from "../components/Containers"
import { SubHeading, QuartenaryHeading } from "../components/Headings"
import { CategoryListItem } from "../components/Categories"
import { GoBack, Navigation, PrevLink, HomeLink, NextLink } from '../components/InnerNavigation'

function Businesses({data, pageContext, location}){
  const HomeIcon = FaHome
  const TagsIcon = FaTags
  const BackIcon = FaChevronLeft
  const ForwardIcon = FaChevronRight
  const [active, setActive] = useState(0)
  if (data && data.allMongodbLocalbusinessesLicenses) {
    const { 
      allMongodbLocalbusinessesLicenses: {
        edges
      }
    } = data
    const {
        currentPage,
        numPages,
        letter
    } = pageContext
    const next = currentPage < numPages ? { to: `/businesses-by-letter/${letter}-${currentPage + 1}`, page: `${letter}-${currentPage + 1}` } : null
    const prev = currentPage > 1 ? { to: `/businesses-by-letter/${letter}-${currentPage - 1}`, page: `${letter}-${currentPage - 1}` } : null
    const businessList = edges;
    const addMarkers = links => map => {
      links.forEach(({node}, index) => {
        const { geocoded_column } = node
        if (geocoded_column) {
          const { coordinates } = geocoded_column
          const marker = typeof window !== `undefined` ? new window.google.maps.Marker({
            map,
            position: {lat: coordinates[1], lng: coordinates[0]},
            label: `${index + 1}`,
            icon: index + 1 === active ? `https://maps.google.com/mapfiles/kml/paddle/ylw-blank.png` : ``,
            title: node.trade_name_of_business,
          }) : ''
          const infoWindow = typeof window !== `undefined` ? new window.google.maps.InfoWindow({
            content: `<div>
              <div>${node.trade_name_of_business}</div>
              <div>${node.business_mailing_address}, ${node.mailing_city}, ${node.mailing_state}, ${node.mailing_zip_code}</div>
              <div>${node.business_phone_number}</div>
              <div>Owned by ${node.owner_name_of_business}</div>
              <span>Double-Click To View More</span>
            </div>`
          }) : ''
          marker.addListener(`dblclick`, () => {
            navigate(`/businesses/${node.trade_name_of_business.toLowerCase().replace(/\s/g, "-").replace(/[?#]/g, "")}`, {
              state: { 
                prevPath: typeof window !== `undefined` ? window.location.pathname : ''
              }
            })
          })
          marker.addListener(`click`, ()=> {
            infoWindow.open(map, marker)
            setActive(index + 1)
          })
          marker.addListener(`mouseover`, ()=> {
            infoWindow.open(map, marker)
            setActive(index + 1)
          })
          marker.addListener(`mouseout`, ()=> {
            infoWindow.close()
            setActive(0)
          })
        }
      })
    }
    const mapProps = {
      options: {
        center: { lat: 36.7958618, lng: -76.1530532 },
        zoom: 11,
      },
      onMount: addMarkers(businessList),
    }
    return (
      <div>
        {
          location && location.state && location.state.prevPath && (
            <GoBack>
              <Link to={location.state.prevPath}><FaArrowLeft/>Go Back</Link>
            </GoBack>
          )
        }
        <QuartenaryHeading style={{textAlign: "center", fontFamily: "'Open Sans', Arial, sans-serif", fontWeight: "700"}}>{`Page ${currentPage} of ${numPages} for businesses starting with ${/[^A-z]/.test(letter) ? "symbols or numbers" : "the letter " + letter}`}</QuartenaryHeading>
        <Navigation>
          <PrevLink>
            {prev && (
              <Link to={prev.to}>
                <BackIcon /> {prev.page}
              </Link>
            )}
          </PrevLink>
          <HomeLink>
            <Link
              to="/businesses/"
              style={{ textAlign: "center", display: "block" }}
            >
              All Businesses
            </Link>
          </HomeLink>
          <NextLink>
            {next && (
              <Link className="link next" to={next.to}>
                {next.page} <ForwardIcon />
              </Link>
            )}
          </NextLink>
        </Navigation>
        <Map {...mapProps}/>
        <ul>
          {
            businessList.map(({node: { govId, trade_name_of_business, business_phone_number }}, idx) => {
              return (
                <CategoryListItem key={govId} index={idx + 1} className={idx + 1 === active ? "active" : "normal"} onMouseOver={e=>setActive(idx+1)}>
                  <SubHeading>
                    <Link 
                      to={`/businesses/${trade_name_of_business.toLowerCase().replace(/\s/g, "-").replace(/[?#]/g, "")}`}
                      state={{ 
                        prevPath: typeof window !== `undefined` ? window.location.pathname : ''
                      }}
                    >
                      {trade_name_of_business}
                    </Link>
                  </SubHeading>
                  <p><a href={`tel:${business_phone_number}`}>{business_phone_number}</a></p>
                </CategoryListItem>
              )
            })
          }
        </ul>
        <Navigation>
          <PrevLink>
            {prev && (
              <Link to={prev.to}>
                <BackIcon /> {prev.page}
              </Link>
            )}
          </PrevLink>
          <HomeLink>
            <Link
              to="/businesses/"
              style={{ textAlign: "center", display: "block" }}
            >
              All Businesses
            </Link>
          </HomeLink>
          <NextLink>
            {next && (
              <Link className="link next" to={next.to}>
                {next.page} <ForwardIcon />
              </Link>
            )}
          </NextLink>
        </Navigation>
        <LinkContainer>
          <Link to="/categories">
            <TagsIcon /> All categories
          </Link>
        </LinkContainer>
        <LinkContainer>
          <Link to="/businesses/">
            <HomeIcon /> All Businesses
          </Link>
        </LinkContainer>
      </div>
    )
  } else {
    return (
      <div>No Businesses Found!</div>
    )
  }
}

export default function PaginatedBusinessesListTemplate(props) {
    return (
      <Layout {...props}>
        <Businesses {...props}/>
      </Layout>
    )
  }

export const businessesListQuery = graphql`
  query businessesListQuery($skip: Int!, $limit: Int!, $regx: String!) {
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
    allMongodbLocalbusinessesLicenses(
      sort: { order: ASC, fields: [trade_name_of_business] }
      filter: {
        trade_name_of_business: {
          regex: $regx
        }
      }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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
    }
  }
`
