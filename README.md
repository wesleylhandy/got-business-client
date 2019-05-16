<figure style="max-width: 980px; margin: 0 auto 20px auto;">
  <img src="./src/images/local-business.jpg" alt="local business" style="display:block; width: 100%"/>
  <figcaption>Image Credit: <a href="https://unsplash.com/photos/acNPOikiDRw">Photo by Priscilla Du Preez on Unsplash</a></figcaption>
</figure>

# Got Business - B2B App

This app is a proof of concept for a bigger project in the works for promoting local business.

The current app is built from a large dataset a collection of Business Licenses awarded in 2018 in the City of Virginia Beach, via [data.vb.gov](https://data.vbgov.com/Business/Business-Licenses/rj9q-c8em). I am currently storing a copy of the dataset in a MongoDB collection, which is the source for this app. I have a Node.js API for gathering updates to this dataset and transforming for this project.

From this dataset, this app generates a list of categories, create pages from those categories, creates both an infinite scrolling list of businesses as well as a paginated alphabetical list of businesses, and finally a page dedicated to each business. In all, there are over 2400 static pages on this site.

Maps on the site are generated from Google Maps. This site is generated via Gatsby.js and hosted on Netlify.

[![Netlify Status](https://api.netlify.com/api/v1/badges/d9d8fb83-4490-4b5c-920f-3e23e3728074/deploy-status)](https://app.netlify.com/sites/vb-business-licenses/deploys)
