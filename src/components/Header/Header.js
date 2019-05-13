import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import HeaderImage from "./HeaderImage"
import { FaChevronDown, FaTimes } from "react-icons/fa"

const menuBreakPoint = "565px" // adjust based on the number of nav links

const StyledHeader = styled.header`
  width: 100%;
  margin: 0;
  padding: 10px 0;
  background: #f1f1f1;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  @media screen and (max-width: 767px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 50;
  }
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  a {
    background-color: transparent;
    cursor: pointer;
    display: block;
    align-self: center;
    color: #000;
    text-decoration: none;
    font-family: Arial, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
    padding: 0 20px;
    line-height: 100px;
    text-align: center;
  }
  a:hover {
    background-color: rgba(0, 0, 0, 0.15);
    color: white;
    text-shadow: 2px 2px black;
  }
  @media screen and (max-width: ${menuBreakPoint}) {
    display: none;
  }
`

const MobileNavigation = styled.nav`
  display: none;
  @media screen and (max-width: ${menuBreakPoint}) {
    display: flex;
  }
`

const DropDownContent = styled.div`
  position: relative;
  display: inline-block;
`

const DropDownIcon = styled.label`
  background-color: transparent;
  text-align: center;
  border: none;
  font-size: 30px;
  padding: 0 40px;
  height: 100px;
  line-height: 100px;
  position: relative;
  display: block;
  cursor: pointer;
  transition: background-color 200ms ease-in-out;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

const DropDownCheckBox = styled.input`
  position: absolute !important;
  left: -9999px !important;
  &:checked ~ div {
    display: block;
  }
  &:checked + label {
    background-color: rgba(0, 0, 0, 0.15);
  }
`

const DropDownLinks = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 5;
  text-align: right;
  margin-top: 10px;
  right: -10px;
  width: 100vw;
  cursor: pointer;
  white-space: nowrap;
  a {
    font-family: Arial, sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 24px;
    color: black;
    background-color: #f1f1f1;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    width: 100%;
  }
  a:hover {
    color: rgb(255, 212, 42);
    background-color: rgba(0, 0, 0, 0.05);
  }
`

const NavLinks = () => (
  <>
    <Link to="/">Home</Link>
    {/** Add more Nav Links here. Feel free to construct multi-level menu as desired **/}
    <Link to="/businesses/">Businesses</Link>
  </>
)

const Header = ({ siteTitle }) => {
  const [checked, setCheck] = useState(false)
  return (
    <StyledHeader>
      <Container>
        <Link to="/">
          <HeaderImage alt={siteTitle} />
        </Link>
        <Navigation>
          <NavLinks />
        </Navigation>
        <MobileNavigation>
          <DropDownContent>
            <DropDownCheckBox
              id="dropcheck"
              name="dropcheck"
              type="checkbox"
              onClick={() => setCheck(!checked)}
            />
            <DropDownIcon htmlFor="dropcheck">
              {checked ? <FaTimes /> : <FaChevronDown />}
            </DropDownIcon>
            <DropDownLinks>
              <NavLinks />
            </DropDownLinks>
          </DropDownContent>
        </MobileNavigation>
      </Container>
    </StyledHeader>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
