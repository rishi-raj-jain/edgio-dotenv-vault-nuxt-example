require('dotenv-vault-core').config()

export default {
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [['@edgio/nuxt/module', { edgioSourceMaps: true }]],
}
