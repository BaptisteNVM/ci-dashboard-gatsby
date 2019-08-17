import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const statusToColor = (state) => {
  if(state === "Success") return "rgba(15, 229, 0, 0.73)";
  if(state === "Failure") return "#ff4a4a";
  return "#b1b1e3" // blueish by default
}

const IndexPage = ({data}) => {
  console.log("retrieving data from xml file using graphql: ", data);
  return (
  <Layout>
    <SEO title="Dashboard" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <hr/>
    <ul>
    {data.allTest1Xml.edges.map(({ node }, index) => (
      <li key={index}>{node.attributes.name}</li>
    ))}
    </ul>
    <hr/>
    {/* TODO Remove the padding on the ul. Easier once a proper css stuff is set up since we would need to do padding: 0 on all li*/}
    <ul style={{listStyleType: "none"}}>
    {data.allTest1Xml.edges.map(({ node }, index) => (
      /* relative position required to align the child div bot right*/
      <div style={{position: "relative", border: "4px solid rgba(200, 200, 200, 0.6)", borderRadius: "8px", backgroundColor: statusToColor(node.attributes.lastBuildStatus), marginBottom: "4px", maxWidth: "400px"}}>
      <li key={index}>{node.attributes.name}
          {
            // TODO fix the url, see the current version's logic
          }
          <span style={{position: "absolute", bottom: 0, right: 0}}>
            <a href={node.attributes.webUrl} target="_blank" rel="noopener noreferrer" className="icon_view icon" title="View project">V</a>
            <span> </span>
            <a href={node.attributes.webUrl} target="_blank" rel="noopener noreferrer" className="async icon_bolt icon" title="Build project">B</a>
          </span>
        <div className="actions">
          
        </div>
        <div class="projectInfo" title={node.attributes.name}>
          <span class="lastActivity">{node.attributes.activity}</span>
          {/*(<span class="lastStatus">{node.attributes.lastBuildStatus}</span>)*/} {/*Removed as the color provides the same info*/} 
        </div>
      </li>
      </div>
    ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)}

export const queryXmlDoc = graphql`
  query {
    allTest1Xml {
      edges {
        node {
          attributes {
            name
            activity
            lastBuildStatus
            webUrl
          }
        }
      }
    }
  } 
`

export default IndexPage
