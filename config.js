let environments = {}

environments.staging = {
  'envName': 'staging',
  'httpPort': 3000,
  'httpsPort': 3001
}

environments.production = {
  'envName': 'production',
  'httpPort': 5000,
  'httpsPort': 5001
}

const currentEnvironment = typeof process.env.NODE_ENV === 'string'
  ? process.env.NODE_ENV.toLowerCase() : ''

const environmentToExport = typeof environments[currentEnvironment] === 'object'
  ? environments[currentEnvironment] : environments.staging

module.exports = environmentToExport
