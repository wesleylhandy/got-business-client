import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { FaTags  } from "react-icons/fa"
import Layout from "../components/layout"
import { LinkContainer } from "../components/Containers"
import { PrimaryHeading, SubHeading } from "../components/Headings"
import { CategoryListItem, CategoryAlpaLinks } from "../components/Categories"

function Businesses({ data, pageContext }) {
  const { allSitePage: { edges } } = data;
  const alphaLinks = edges.reduce((arr, {node: { path: pathName }}, idx) => {
    if (/-1$/.test(pathName)) {
      const letter = pathName.replace("/businesses-by-letter/", "").split("-")[0]
      arr.push(<Link key={`link=${idx}`} to={pathName} aria-label={`Link to Businesses starting with ${/[^A-z]/.test(letter) ? "Symbols or Numbers" : "the letter " + letter}`}>{letter}</Link>)
    }
    return arr
  }, [])

  const { businessList } = pageContext
  const TagsIcon = FaTags
  
  const [ active, setActive ] = useState(0)
  const [ hasMore, setMore ] = useState(businessList.length > 10)
  const [ businesses, addBusinesses ] = useState([...businessList.slice(0, 10)])

  const loadBusinesses = () => {
    const currentLength = businesses.length
    const more = currentLength < businessList.length
    const nextBusinesses = more ? businessList.slice(currentLength, currentLength + 20) : []
    setMore(more)
    addBusinesses([...businesses, ...nextBusinesses])
  }

  const handleScroll = () => {
    if ( !hasMore ) return;
    if ( window && ( window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight ) ){
      loadBusinesses()
    }
  }

  const handleTouchEnd = (e) => {
    if (e.target.localName !== "a") {
      e.preventDefault(); 
      handleScroll();
    } else {
      console.log("click")
    }
  }
  
  useEffect(() => {
    window && window.addEventListener('touchend', handleTouchEnd)
    window && window.addEventListener('scroll', handleScroll)
    window && window.addEventListener('resize', handleScroll)
    return () => {
      window && window.removeEventListener('touchend', handleTouchEnd)
      window && window.removeEventListener('scroll', handleScroll)
      window && window.removeEventListener('resize', handleScroll)
    };
  }, [businesses, hasMore])

  return (
    <div>
      <PrimaryHeading>All Businesses</PrimaryHeading>
      <CategoryAlpaLinks>
        {alphaLinks}
      </CategoryAlpaLinks>
      <ul>
        {
          businesses.map(({node: { govId, trade_name_of_business, business_phone_number }}, idx) => {
            return (
              <CategoryListItem key={govId} index={idx + 1} className={idx + 1 === active ? "active" : "normal"} onMouseOver={e=>setActive(idx+1)}>
                <SubHeading style={{pointerEvents: "auto"}}>
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
      {
        !hasMore &&
          <div>All Businesses Loaded!</div>
      }
      {
        hasMore &&
          <div>Scroll Down to Load More...</div>
      }
      <LinkContainer>
        <Link to="/categories">
          <TagsIcon /> All categories
        </Link>
      </LinkContainer>
    </div>
  )
}

function InfiniteBusinessListTemplate(props) {
  return (
    <Layout {...props}>
      <Businesses {...props}/>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PaginatedListQuery ($regx: String!) {
    allSitePage(filter: {
      path: {
        regex: $regx
      }
    }) {
      edges {
        node {
          path
        }
      }
    }
  }
`

export default InfiniteBusinessListTemplate