const { name } = require("./package.json")

require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})

const siteUrl =
  process.env.URL || process.env.DEPLOY_URL || "http://localhost:8000"

module.exports = {
  pathPrefix: process.env.CI ? `/${name}` : `/`,
  siteMetadata: { // initialize site metadata for SEO
    title: `Got Business?`,
    description: `An App for Connecting with Newly Established Businesses in Your Area`,
    author: {
        name: `Wesley L. Handy`, 
    }, 
    siteUrl,
    siteVerification: ``,
    social: { //usernames for SEO
      twitter: "wesleylhandy",
      linkedin: "wesleylhandy"
    },
    socialLinks: { // profile URLS for social links, include https://
        twitter: "https://twitter.com/WesleyLHandy",
        linkedin: "https://www.linkedin.com/in/wesleylhandy/",
        facebook: "",
        stackOverflow: "https://stackoverflow.com/users/6917743/wlh",
        github: "https://github.com/wesleylhandy",
        instagram: "",
        youtube: "",
        email: "mailto:wesley@wearecreativ.media", //include mailto:
        phone: "tel:9195543504" //include tel:
    },
    keywords: [
      "Gatsby",
      "Infinite Scroll",
      "MongoDB",
      "gatsby-source-mongodb",
      "Virginia Beach Business Licenses",
      "local business",
      "who owns this business"
    ],
    organization: { //update with relevant personal data
      name: "Wesley L. Handy", 
      url: "https://www.wesleylhandy.net"
    },
    lang: "en"
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `` // set up your own analytics account for this site and insert id here
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
        resolve: `gatsby-source-mongodb`,
        options: {
            connectionString: `${process.env.MONGODB_CONNECT_STRING}`,
            dbName: `localbusinesses`,
            collection: `licenses`,
            map: {
                licenses: {
                    business_classification: String,
                    business_mailing_address: String,
                    business_phone_number: String,
                    business_zip_4: String,
                    discovery_date: String,
                    geocoded_column: {
                        type: String,
                        coordinates: [Number]
                    },
                    geocoded_column_city: String,
                    geocoded_column_state: String,
                    geocoded_column_zip: String,
                    mailing_city: String,
                    mailing_state: String,
                    mailing_zip_4: String,
                    mailing_zip_code: String,
                    naics: String,
                    owner_name_of_business: String,
                    trade_name_of_business: String,
                    govId: String,
                    dataAdded: String,
                    google_verified: Boolean
                }
            },
            preserveObjectIds: false,
        }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: true,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              // Deactivate the plugin globally (default: true)
              active : true,
              // Add a custom css class
              class  : 'emoji-icon',
              // Select the size (available size: 16, 24, 32, 64)
              size   : 64,
              // Add custom styles
              styles : {
                display      : 'inline',
                margin       : '0',
                position     : 'relative',
                top          : '2px',
                width        : '19px'
              }
            }
          }
        ],
      },
    },
    // only use the following if you are importing web fonts as files, use gatsby-browser.js to handle external web fonts such as google fonts or typekit
    // {
    //   resolve: `gatsby-plugin-web-font-loader`,
    //   options: {
    //     custom: {
    //       families: ['komika_title-regular', 'komika_title-axis_regular'],
    //       urls: ['/fonts/komikatitle_regular_macroman/stylesheet.css', '/fonts/komikatitle-axis_regular_macroman/stylesheet.css']
    //     }
    //   }
    // },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: false,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Got Business?`, // UPDATE
        short_name: `Got Business?`, // UPDATE
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `navy`, // UPDATE
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the project.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    "gatsby-plugin-offline",
  ],
}