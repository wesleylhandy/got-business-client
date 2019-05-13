import React from 'react'
import PropTypes from "prop-types"
import { Twitter, Facebook, Mail, Linkedin, Reddit, HackerNews } from 'react-social-sharing'
import styled from '@emotion/styled'

const SharingContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 20px;
    margin: 20px 0;
    max-width: 500px;
    flex-wrap: wrap;
    background: #f1f1f1;
    border: 1px solid #ccc;
    span {
        margin: 10px;
    }
    a {
        margin: 10px;
    }
`

const Sharing = ({pathName, title, siteUrl}) => {
    const link = `${siteUrl}/${pathName}`
    return (
        <SharingContainer>
            <span>Share</span>
            <Twitter solid small message={`Check out this local business in Virginia Beach - ${title} #GoLocal`} link={link}/>
            <Facebook solid small link={link}/>
            <Linkedin solid small message={`Check out this local business in Virginia Beach - ${title} #GoLocal`} link={link}/>
            <Reddit solid small link={link}/>
            <HackerNews solid small link={link}/>
            <Mail solid small subject={`Check out this local business in Virginia Beach - ${title} #GoLocal`} body={`Check out this local business in Virginia Beach - ${title} over at ${link}`}/>
        </SharingContainer>
    )
}

Sharing.propTypes = {
    siteUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
}

export default Sharing;