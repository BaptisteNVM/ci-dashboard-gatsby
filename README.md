<p align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  CI Dashboard
</h1>

## 🚀 List of things

1.  **Rebuild it with Gatsby**
    With local xml data
    With polled data

2.  **Improve UX**
    Buttons always visible
    Remove the label that repeats the color
      Replace Building / Sleeping / Checking for modifications with gifs / nice svgs
      Have a detailed tooltip displayed, that comes from the config (at least for now, ideally it would come from jenkins / ccnet)
      Add a button to pop a modal window, to describe how the dashboard works / shows the mapping between colors and statuses
      Nice ico

3.  **Improve layout**
    Have a list of mappings between project name, row, column.
    Display accordingly
    Have a checkConfig that logs when the data received does not match the config

4.  **Center it**
    CSS is hard
    Move to styled-components
    Clean-up

## And
Is this applicable / helping:
    Have a "Direction" config on each project and display an arrow inside the block that can point down, up, convergent (-> <-), divergent (<- ->)
Have a look and see hard it is to make it a generic or Jenkins dashboard
	  A middleware responsible for the mapping of the fields, configurable urls, JSON data polling support and more.

https://www.gatsbyjs.org/docs/quick-start/
https://www.gatsbyjs.org/docs/