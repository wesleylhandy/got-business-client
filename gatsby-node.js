const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

const createBusinessPages = (createPage, edges) => {
  const paginatedBusinessListTemplate = path.resolve(`src/templates/paginated-business-list.js`)
  const infiniteBusinessListTemplate = path.resolve(`src/templates/infinite-business-list.js`)

  const lettersArr = '*ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
  const businesses = {};

  edges.forEach(({ node }) => {
    const initial = node.trade_name_of_business.trim().slice(0,1);
    const alpha = lettersArr.includes(initial.toUpperCase()) ? initial.toUpperCase() : "*"
    if (!businesses[alpha]) {
      businesses[alpha] = []
    }
    businesses[alpha].push(node)
  })

  createPage({
    path: "/businesses",
    component: infiniteBusinessListTemplate,
    context: {
      businessList: edges,
      regx: "/(businesses-by-letter)/"
    },
  })
  // console.log({businesses, keys: Object.keys(businesses)})
  const businessesPerPage = 10;
  Object.keys(businesses).forEach(letter => {
    const listLength = businesses[letter].length
    const numPages = Math.ceil(listLength / businessesPerPage)
    const regx = /[^A-z]/.test(letter) ? "/^[^A-z].*/i" : `/^(${letter}).*/i`
    for (let idx = 0; idx < numPages; idx++) {
      // console.log({letter, numPages, regx, idx: idx + 1})
      createPage({
        path: `/businesses-by-letter/${letter}-${idx + 1}`,
        component: paginatedBusinessListTemplate,
        context: {
          limit: businessesPerPage,
          skip: idx * businessesPerPage,
          numPages,
          currentPage: idx + 1,
          regx,
          letter,
        },
      })
    }
  })
}

const createCategoryPages = (createPage, edges) => {
  const categoryTemplate = path.resolve(`src/templates/categories-template.js`)
  const licenses = {}

  edges.forEach(({ node }) => {
    if (node.business_classification) {
      const classifications = node.business_classification.split(" / ");
      classifications.forEach(classification => {
        if (!licenses[classification]) {
          licenses[classification] = []
        }
        licenses[classification].push(node)
      })
    }
  })

  createPage({
    path: "/categories",
    component: categoryTemplate,
    context: {
      licenses,
    },
  })

  Object.keys(licenses).forEach(classification => {
    const license = licenses[classification]
    const category = classification.toLowerCase().replace(/\s/g, "-")
    createPage({
      path: `/categories/${category}`,
      component: categoryTemplate,
      context: {
        licenses,
        license,
        category,
      },
    })
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const businessCardTemplate = path.resolve(`src/templates/business-card.js`)
  // const blogPostTemplateAmp = path.resolve(`src/templates/blog-post-amp.js`)
  return graphql(`
    {
      allMongodbLocalbusinessesLicenses(
        sort: { order: ASC, fields: [trade_name_of_business] }
        limit: 3000
      ) {
        edges {
          node {
            mongodb_id
            trade_name_of_business
            owner_name_of_business
            google_verified
            geocoded_column {
              type
              coordinates
            }
            geocoded_column_address
            geocoded_column_city
            geocoded_column_state
            geocoded_column_zip
            business_mailing_address
            mailing_city
            mailing_state
            mailing_zip_code
            mailing_zip_4
            business_phone_number
            business_classification
            discovery_date
            naics
            govId
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const licenses = result.data.allMongodbLocalbusinessesLicenses.edges

    createCategoryPages(createPage, licenses)
    createBusinessPages(createPage, licenses)

    // Create pages for each markdown file.
    licenses.forEach(({ node }, index) => {
      const prev = index === 0 ? null : licenses[index - 1].node
      const next = index === licenses.length - 1 ? null : licenses[index + 1].node
      const pathName = `/businesses/${node.trade_name_of_business.toLowerCase().replace(/\s/g, "-")}`
      createPage({
        path: pathName,
        component: businessCardTemplate,
        context: {
          mongoId: node.mongodb_id,
          prev,
          next,
        },
      })
    })

    return licenses
  })
}
