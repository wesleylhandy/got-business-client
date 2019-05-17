<figure style="max-width: 980px; margin: 0 auto 20px auto;">
  <img src="https://vb-business-licenses.netlify.com/static/30aab68784e6501ac6072f90d7dcfe03/463d3/local-business.jpg" alt="local business" style="display:block; width: 100%"/>
  <figcaption>Image Credit: <a href="https://unsplash.com/photos/acNPOikiDRw">Photo by Priscilla Du Preez on Unsplash</a></figcaption>
</figure>

# Got Business - B2B App

This app is a proof of concept for a bigger project in the works for promoting local business.

The current app is built from a large dataset a collection of Business Licenses awarded in 2018 in the City of Virginia Beach, via [data.vb.gov](https://data.vbgov.com/Business/Business-Licenses/rj9q-c8em). I am currently storing a copy of the dataset in a MongoDB collection, which is the source for this app. I have a Node.js API for gathering updates to this dataset and transforming for this project.

From this dataset, this app generates a list of categories, create pages from those categories, creates both an infinite scrolling list of businesses as well as a paginated alphabetical list of businesses, and finally a page dedicated to each business. In all, there are over 2400 static pages on this site.

Maps on the site are generated from Google Maps. This site is generated via Gatsby.js and hosted on Netlify here: https://vb-business-licenses.netlify.com/

## Steps to Complete the Project

1. Node/Express/MongoDB Server

    I started this project by creating a server via `Node.js` and the `express` package to gather and transform data from the public dataset. I create a DAO to handle the transformation and insertion of the data into a MongoDB Atlas server. The server allows data to be fetched, inserted, updated, or removed, and can retrieve one or many records and sort by id, name, or category. Storing in `MongoDB` allows me to use my `Node` server to run chron jobs to fetch new records when the dataset is updated monthly. It also allows me to source my client from a stable environment rather than from the external open-data api.
  
2. Gatsby Plugin Development

    I wanted to build this project in React, and initially planned on using `create-react-app` and hosting a complete MERN stack application on Heroku. However, while working on other development projects at work, I discovered [Gatsby](https://www.gatsbyjs.org/), which is a static-site generator that extracts data from any number of conceivable sources, and leverages the power of `GraphQL` and `React` to produce fast, optimized JAMstack sites.
    
    *But There Was a Problem with the `gatsby-source-mongodb` plugin*
    
    The `mongodb` source plugin for Gatsby was optimized for older versions. I could not connect to my cloud Atlas server and extract my data. This led me to [become an open source contributer to Gatsby](https://github.com/pulls?utf8=%E2%9C%93&q=is%3Apr+gatsby+archived%3Afalse+is%3Aclosed+wesleylhandy), where I fixed the problem I was having and also later solved another issue. I look forward to continuing my contributions to the project.
    
    After updating the plugin, I was ready to build my application.
    
3. React, GraphQL, and Gatsby

    The site is built completely in React, using modern React features like `hooks` and `context`. I only created two pages (an Index and 404 page, respectively), but four templates together with Gatsby's `createPage` API allows this site to generate several thousand individual pages, as well as lists of businesses. It harnesses the power of `graphql` to match templates with the exact data I need. It's a builtiful system. The site is styled using [`emotion`](https://emotion.sh/docs/introduction) styled components, as well as [`typography.js`](https://kyleamathews.github.io/typography.js/).
    
    Challenges during the build include the need to conditionally reference client globals like `window` and `document` throughout the project. Also, to deploy to [Netlify](https://www.netlify.com/), page nodes cannot contain special characters like hashes and question marks, and environment variables referenced in the client must be prefixed by `GATSBY_`.

4. Google Maps

    The project also incorporates Google maps, which is always fun and easy to include, though adding the appropriate maps Script was a challenge since even using `react-hemlet` the script wasn't loading before the compoent rendered and I received errors. For reference, here is the Map component (credit to [Janosh Riebesell](https://janosh.io/blog/google-maps+react-hooks)):
    
```javascript
import React, { useEffect, useRef, useCallback } from 'react'

function Map({ options, onMount, className }) {
  const props = { ref: useRef(), className }
  const onLoad = () => {
    const map = typeof window !== `undefined` ? new window.google.maps.Map(props.ref.current, options) : ''
    onMount && onMount(map)
  }

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`)
      script.type = `text/javascript`
      script.src =
        `https://maps.google.com/maps/api/js?key=` +
        process.env.GATSBY_GOOGLE_MAPS_API_KEY
      const headScript = document.getElementsByTagName(`script`)[0]
      headScript.parentNode.insertBefore(script, headScript)
      script.addEventListener(`load`, onLoad)
      return () => script.removeEventListener(`load`, onLoad)
    } else onLoad()
  })

  return (
    <div {...props} style={{height: `50vh`, margin: `1em 0`, borderRadius: `0.5em`, backgroundColor: `#ccc` }} />
  )
}

Map.defaultProps = {
  options: {
    center: { lat: 36.7958618, lng: -76.1530532 },
    zoom: 11,
  },
}

export default props => useCallback(<Map {...props}/>, []);
```

[![Netlify Status](https://api.netlify.com/api/v1/badges/d9d8fb83-4490-4b5c-920f-3e23e3728074/deploy-status)](https://app.netlify.com/sites/vb-business-licenses/deploys)
