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
