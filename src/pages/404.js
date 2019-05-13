import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO/Seo"
import {PrimaryHeading} from '../components/Headings'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <PrimaryHeading>NOT FOUND</PrimaryHeading>
    <p>Holey rusted metal, Batman...You just hit a route that doesn&rsquo;t exist.</p>
  </Layout>
)

export default NotFoundPage
