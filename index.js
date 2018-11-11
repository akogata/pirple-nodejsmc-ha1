/*
 * Hello World API
 * */

// API support
const createHttpServer = require('http').createServer
const createHttpsServer = require('https').createServer
const { parse } = require('url')
const { StringDecoder } = require('string_decoder')
// Configuration support
const { httpPort, envName, httpsPort } = require('./config')
const { readFileSync } = require('fs')

// HTTP server
const httpServer = createHttpServer(unifiedServer)
httpServer.listen(httpPort, () => {
  console.log(`Http server listening on port ${httpPort} now in ${envName} mode`)
})

// HTTPS server
const httpsServerOptions = {
  'key': readFileSync('https/key.pem'),
  'cert': readFileSync('https/cert.pem')
}
const httpsServer = createHttpsServer(httpsServerOptions, unifiedServer)
httpsServer.listen(httpsPort, () => {
  console.log(`Https server listening on port ${httpsPort} now in ${envName} mode`)
})

function unifiedServer (req, res) {
  const parsedUrl = parse(req.url, true)
  const path = parsedUrl.pathname
  const queryString = parsedUrl.query
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')
  const method = req.method.toLowerCase()
  const headers = req.headers

  const decoder = new StringDecoder('utf-8')
  let buffer = ''
  // get the payload
  req.on('data', data => {
    buffer += decoder.write(data)
  })
  // when payload is ready...
  req.on('end', () => {
    buffer += decoder.end()
    console.log('\n\nRequest received on path: [' + trimmedPath + '] with method:', method, 'with QueryString:', queryString)
    console.log('Headers:', JSON.stringify(headers).slice(0, 50))
    console.log('Payload:', JSON.stringify(buffer).slice(0, 50))

    // pick a handler for the request
    const chosenHandler = trimmedPath in router ? router[trimmedPath] : handlers.notFound

    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryString,
      'method': method,
      'headers': headers,
      'payload': buffer
    }
    chosenHandler(data, (statusCode, payload) => {
      statusCode = typeof statusCode === 'number' ? statusCode : 200
      payload = typeof payload === 'object' ? payload : {}
      const payloadString = JSON.stringify(payload)
      res.setHeader('Content-Type', 'application/json')
      res.writeHead(statusCode)
      res.end(payloadString)
      console.log('Returning payload:', statusCode, payloadString)
    })
  })
}

// routing checks here
let handlers = {}

// optional input: name
handlers.hello = (data, callback) => {
  let name = 'stranger' // default name
  console.debug(data.queryStringObject)
  console.debug(data.headers)
  // Try to read 'name' from both query string and header
  const PARAM_NAME = 'name'
  if (PARAM_NAME in data.queryStringObject) {
    name = data.queryStringObject['name']
  } else if (PARAM_NAME in data.headers) {
    name = data.headers['name']
  }
  callback(200, { 'hello': name })
}

handlers.notFound = (data, callback) => {
  callback(404)
}

const router = {
  'hello': handlers.hello
}
