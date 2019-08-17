module.exports = {
  siteMetadata: {
    title: "Call Centre CI Dashboard",
    description: "Dashboard to display the different projects from CCNET. Hopefully easy to configure, via config.js. "
    + "You need to give the mapping between the name of the different projects and the where you want them to be displayed. "
    + "If the config and the data received missmatch (a missing project for example), you'll be notified in the console.",
    author: `@baptiste`,
  },
  plugins: [
    `gatsby-transformer-xml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `test-data`,
        path: `${__dirname}/src/test-data`,
      },
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        // The url, this should be the endpoint you are attempting to pull data from
        url: `http://localhost:8282/ccnet/XmlStatusReport`,
  
        method: "get",
  
        headers: {
          "Content-Type": "application/xml"
        },
  
        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `projects`,
  
        // Nested level of entities in response object, example: `data.posts`
        entityLevel: `data.projects`,
  
        payloadKey: `body`,
  
        // Optionally save the JSON data to a file locally
        // Default is false
        localSave: false,
  
        // Optionally include some output when building
        // Default is false
        verboseOutput: true, // For debugging purposes
  
        // Optionally re-source data when it changes and
        // `gatsby develop` is running.
        // Requires `ENABLE_GATSBY_REFRESH_ENDPOINT=true`.
        // See https://www.gatsbyjs.org/docs/environment-variables/#reserved-environment-variables
        // Default is false
        enableDevRefresh: true
      }
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#d4d4d4`,
        theme_color: `#1f1f1f`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
