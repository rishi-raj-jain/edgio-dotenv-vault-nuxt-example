'use strict'

module.exports = {
  connector: '@edgio/nuxt',

  // Set to true to include all packages listed in the dependencies property of package.json when deploying to Edgio.
  includeNodeModules: true,

  // Allows you to include additional resources in the bundle that is deployed to Edgio’s serverless JS workers.
  // Keys are globs, value can be a boolean or string. This is typically used to ensure that resources
  // that need to be dynamically required at runtime such as build manifests for server-side rendering
  // or other config files are present in the cloud.
  includeFiles: {
    '.env.vault': true,
  },
}
