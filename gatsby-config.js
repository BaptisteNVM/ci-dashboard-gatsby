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
      resolve: "apiserver-xml-datapolling",
      options: {
        // The url, this should be the endpoint you are attempting to pull data from
        url: `http://localhost:8282/ccnet/XmlStatusReport`,

        // CCNET does not support json
        // json expected by default
        headers: {
           "Content-Type": "application/xml"
        },
        method: "get",
        // TODO Is this usefull?
        auth: false,
        // Name of the data to be downloaded.  Will show in graphQL or be saved to a file
        // using this name. i.e. posts.json
        name: `projects`,

        // Nested level of entities in response object, example: `data.posts`
        entityLevel: "Projects.Project", // do res.Projects.Project to get the data for the node (an array in this case)

        // Optional payload key name if your api returns your payload in a different key
        // Default will use the full response from the http request of the url
        // payloadKey: `Projects`, don't neet this 

        // Optionally save the JSON data to a file locally
        // Default is false
        localSave: false,
  
        // Optionally include some output when building
        // Default is false
        verboseOutput: true,
  
        // Define schemaType to normalize blank values
        // TODO Is this usefull?
        // schemaType: {
        //     array: [{
        //       activity: "String",
        //       lastBuildStatus: "String",
        //       name: "String",
        //       webUrl: "String",
        //     }]
        // }
      },
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
