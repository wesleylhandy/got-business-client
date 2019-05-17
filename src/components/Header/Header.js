import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "@emotion/styled"
import HeaderImage from "./HeaderImage"
import { FaChevronDown, FaTimes } from "react-icons/fa"

const menuBreakPoint = "767px" // adjust based on the number of nav links

const StyledHeader = styled.header`
  width: 100%;
  margin: 0;
  padding: 0;
  background: #f1f1f1;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
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
    color: navy;
    text-decoration: none;
    font-family: 'Bungee Shade', cursive;
    font-size: 24px;
    padding: 0 20px;
    line-height: 100px;
    text-align: center;
  }
  a:hover {
    background-color: navy;
    color: white;
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
  margin-top: 0;
  right: 0;
  width: 100vw;
  cursor: pointer;
  white-space: nowrap;
  a {
    font-family: 'Bungee Shade', cursive;
    font-size: 24px;
    color: black;
    background-color: #f1f1f1;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    width: 100%;
    transition: color 200ms ease-in-out, background-color 200ms ease-in-out;
  }
  a:hover {
    color: #fff;
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const NavLinks = () => (
  <>
    <Link to="/">Home</Link>
    {/** Add more Nav Links here. Feel free to construct multi-level menu as desired **/}
    <Link to="/categories/">Categories</Link>
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
              aria-label={checked ? "Click to Hide Menu" : "Click to Show Menu" }
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
