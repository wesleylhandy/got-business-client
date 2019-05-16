import React from "react"
import styled from "@emotion/styled"

// const H1 = styled.h1`
//   font-family: Arial, sans-serif;
//   font-weight: 700;
//   font-style: normal;
// `
export const PrimaryHeading = ({children, style = {}}) => (
    <h1 style={style}>{children}</h1>
)

// const H2 = styled.h2`
//   font-family: Arial, sans-serif;
//   font-weight: 700;
//   font-style: normal;
// `
export const SubHeading = ({children, style = {}}) => (
    <h2 style={style}>{children}</h2>
)

const H3 = styled.h3`
  margin: 5px 0;
  &:after {
    content: '';
    height: 5px;
    width: 100%;
    background: linear-gradient(to left, #61dafb, rebeccapurple, #61dafb, rebeccapurple, #61dafb, rebeccapurple);
    display:block;
    margin-bottom: 30px;
  }
`
export const TertiaryHeading = ({children, style = {}}) => (
    <H3 style={style}>{children}</H3>
)

const H4 = styled.h4`
  margin: 5px 0 20px 0;
`
export const QuartenaryHeading = ({children, style = {}}) => (
    <H4 style={style}>{children}</H4>
)