import React from "react"
import styled from "@emotion/styled"

const CategoryList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 -10px;
  flex-wrap: wrap;
  padding: 0;
  width: 100%;
  a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    margin: 10px;
    padding: 14px;
    text-decoration: none;
    font-weight: 700;
    color: navy;
    transition: background-color 200ms ease-in-out, color 200ms ease-in-out;
  }
  a:nth-of-type(even) {
    background: rgba(30,144,255, .5);
  }
  a:nth-of-type(odd) {
    background: rgba(145, 145, 145, .5);
  }
  a:hover {
    color: #fff;
    outline: none;
  }
  a:nth-of-type(even):hover {
    background: rgba(30,144,255, 1);
  }
  a:nth-of-type(odd):hover {
    background: rgba(145, 145, 145, 1);
  }
`

export function CategoryContainer({children}) {
  return (
      <CategoryList>
        {children}
      </CategoryList>
  )
}

const Links = styled.div`
  margin: 20px 0;
`

export function LinkContainer({children, style = {}}) {
  return (
    <Links style={style}>{children}</Links>
  )
}

const BusinessCard = styled.div`
  max-width: 980px;
  margin: 0 auto;
  width: 100%;
`

export function BusinessCardContainer({children}) {
    return (
        <BusinessCard>
          {children}
        </BusinessCard>
    )
}