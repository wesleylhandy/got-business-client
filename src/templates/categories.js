import React from "react"
import { Link } from "gatsby"
import { FaHome, FaTags } from "react-icons/fa"

import Layout from "../components/Layout"
import LinkContainer from "../components/LinkContainer"
import {PrimaryHeading, SubHeading} from "../components/Headings"
import styled from "@emotion/styled"

const Li = styled.li`
  list-style: none;
  padding: 10px;
  &:nth-of-type(even) {
    background: rgba(102, 51, 153, 1);
    color: white;
    a {
      color: white;
    }
    a:hover {
      color: #ffd42a;
    }
  }
  &:nth-of-type(odd) {
    background: rgba(97, 218, 251, 1);
  }
`

const TagList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  margin: 30px -10px;
  padding-left: 1.45rem;
  li {
    box-sizing: border-box;
    display: inline;
    margin: 10px;
    flex: 0 0 auto;
    border: 4px solid transparent;
    border-radius: 20px;
    padding: 0;
    transition: background-color 200ms ease-in-out, border-color 200ms ease-in-out;
    a {
      padding: 10px;
      display: block;
      width: 100%;
    }
  }
  li:nth-of-type(even):hover {
    background: rgba(102, 51, 153, 0.75);
    border-color: rgba(102, 51, 153, 1)
  }
  li:nth-of-type(odd):hover {
    background: rgba(97, 218, 251, 0.75);
    border-color: rgba(97, 218, 251, 1);
  }
`

function Categories({ licenses, license, category }) {
  const HomeIcon = FaHome
  const TagsIcon = FaTags
  if (category) {
    return (
      <div>
        <PrimaryHeading>
          {license.length} Businesses{license.length === 1 ? "" : "s"} tagged with {category}
        </PrimaryHeading>
        <ul>
          {license.map(({ govId, trade_name_of_business, business_phone_number }) => {
            return (
              <Li key={govId}>
                <SubHeading>
                  <Link to={`/businesses/${trade_name_of_business.toLowerCase().replace(/\s/g, "-")}`}>{trade_name_of_business}</Link>
                </SubHeading>
                <p>{business_phone_number}</p>
              </Li>
            )
          })}
        </ul>
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
  }
  return (
    <div>
      <PrimaryHeading>Categories</PrimaryHeading>
      <TagList>
        {Object.keys(licenses).map(categoryName => (
          <Li key={categoryName}>
            <Link to={`/categories/${categoryName.toLowerCase().replace(/\s/g, "-")}`}>{categoryName}</Link>
          </Li>
        ))}
      </TagList>
      <LinkContainer>
        <Link to="/businesses/">
          <HomeIcon /> All Businesses
        </Link>
      </LinkContainer>
    </div>
  )
}

export default function CategoryTemplate(props) {
  const { pageContext } = props
  return (
    <Layout {...props}>
      <Categories {...pageContext} />
    </Layout>
  )
}
