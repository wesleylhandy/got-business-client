import styled from "@emotion/styled"

export const GoBack = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  a>svg {
    margin-right: 5px;
  }
`

export const Navigation = styled.div`
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 1fr 1fr 1fr;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 20px;
`
export const PrevLink = styled.div`
  text-align: left;
`
export const HomeLink = styled.div`
  text-align: center;
`

export const NextLink = styled.div`
  text-align: right;
`