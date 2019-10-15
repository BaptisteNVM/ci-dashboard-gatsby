import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import styled from "styled-components"

const statusToColor = (state) => {
  if(state === "Success") return "rgba(15, 229, 0, 0.73)";
  if(state === "Failure") return "rgba(191, 63, 63, 0.73)";
  return "rgba(63, 127, 191, 0.43)" // blueish by default
}

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
  align-item: flex-start;
  margin-bottom: 1.45rem,
`

const FlexItem = styled.div`
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  align-self: auto;
  margin: 4px;
  max-width: 400px;
`

const IndexPage = ({data}) => {
  console.log("retrieving data from xml file using graphql: ", data);
  return (
  <Layout>
    <SEO title="Dashboard" />
    <FlexContainer>
    {data.allProjects.edges.map(({ node }, index) => (
      /* relative position required to align the child div bot right*/
      // TODO Move FlexItem to a separate React coomponent
      <FlexItem style={{position: "relative", border: "4px solid rgba(200, 200, 200, 0.6)", borderRadius: "8px", backgroundColor: statusToColor(node._attributes.lastBuildStatus)}}>
          <span>{node._attributes.name}</span>
          <div style={{position: "absolute", bottom: 0, right: 0}}>
            <a href={node._attributes.webUrl} target="_blank" rel="noopener noreferrer" className="icon_view icon" title="View project">V</a>
            <span> </span>
            <a href={node._attributes.webUrl} target="_blank" rel="noopener noreferrer" className="async icon_bolt icon" title="Build project">B</a>
          </div>
        <div class="projectInfo" title={node._attributes.name}>
          <span class="lastActivity">{node._attributes.activity}</span>
        </div>
      </FlexItem>
    ))}
    </FlexContainer>
    <hr/>
  </Layout>
)}

//TODO: Shoudle be allProjects...
export const queryXmlDoc = graphql`
  query {
    allProjects {
      edges {
        node {
          _attributes {
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
