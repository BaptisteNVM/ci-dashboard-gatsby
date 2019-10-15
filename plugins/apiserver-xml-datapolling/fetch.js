const axios = require(`axios`)
const fs = require('fs')
const stringify = require(`json-stringify-safe`)
const httpExceptionHandler = require(`./http-exception-handler`)
const chalk = require('chalk')
const xmlJs = require('xml-js')
const log = console.log

async function fetch({
  url,
  method,
  headers,
  data,
  name,
  localSave,
  path,
  payloadKey,
  auth,
  params,
  verbose,
  reporter
}) {

  let allRoutes

  // Attempt to download the data from api
  try {
    let options = {
      method: method,
      url: url,
      headers: headers,
      data: data,
      params: params
    }
    if(auth) {
      options.auth = auth
    }
    allRoutes = await axios(options)
  } catch (e) {
    console.log('\nGatsby Source Api Server response error:\n', e.response.data && e.response.data.errors)
    httpExceptionHandler(e, reporter)
  }

  if(allRoutes) {
    //console.log(`allRoutes: `, allRoutes.data)
    //console.log(`headers. Is there xml there?`, headers)
    
    // Create a local save of the json data in the user selected path
    if(localSave) {
      try {
        fs.writeFileSync(`${path}${name}.json`, stringify(allRoutes.data, null, 2))
      } catch(err) {
        reporter.panic(`Plugin ApiServer could not save the file.  Please make sure the folder structure is already in place.`, err)
      }

      if(verbose) {
        log(chalk`{bgCyan.black Plugin ApiServer} ${name}.json was saved locally to ${path}`)
      }
    }
    // Headers casing is not garanteed. Let's assume nothing uses Content-type  or other insanity. Do other http lib guarentee it?
    // https://github.com/axios/axios/issues/1237
    
    // TODO move this out
    const contentType = headers ? headers[`content-type`] || headers[`Content-Type`] : null
    const isXml = contentType || (contentType === `application/xml`) || (contentType === `text/xml`)
    if(isXml){
      allRoutes.data = JSON.parse(xmlJs.xml2json(allRoutes.data, {compact: true, spaces: 0}))
      //console.log("Converted the xml body to ", allRoutes.data)
    }

    // Return just the intended data
    if(payloadKey) {
      return allRoutes.data[payloadKey]
    }
    return allRoutes.data
  }
}

module.exports = fetch
