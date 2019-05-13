import React from "react"
import styled from "@emotion/styled"

const Container = styled.div`
  margin: 20px 0;
`

const LinkContainer = ({children, style = {}}) => (
    <Container style={style}>{children}</Container>
)

export default LinkContainer