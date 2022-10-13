export default {
  server: {     
    // host: '0.0.0.0', // default: localhost   
  },   // other configs 
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'napoleon_front',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/dotenv'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { isDev, isClient }) {

      config.node= {
         fs: 'empty',
         child_process: "empty",
         net: "empty",
         tls: "empty"
       }
   },
   postcss: null
  },

  styleResources: {
    scss: [
      './assets/scss/variables/*.scss',
      './assets/scss/breakpoints.scss',
      './assets/scss/fonts.scss',
      './assets/scss/fonts-styles.scss',
    ]
  },

  axios: {
    baseURL: 'http://localhost:1337',
    headers : {
      common: {
        'Authorization' : 'bearer a50f284abf8672542833fde1d9d595d753b0d58d4d19265885e3bcc7ef222ae2afe7a5fed99e3f48f5d10c7e4d4f55ed027ff76222d000be7edea56d848b44a9e5c868d859ef7b0c44a7738e95e05d2c2e9f90abf7b29a7eaa119818dbe2ef64ea5366316e4d4f8613f0cc9caae72da7f34b99cea7b428af8efbfa21114bceb1'
      }
    }
  },

  apollo: {
    // includeNodeModules: true,
    // clientConfigs: {
    //   default: '@/graphql/config/default.js' // This is where you'll set up the client and import the possible fragment types
    // }
  
    clientConfigs: {
      default: {
        httpEndpoint: process.env.API_ENDPOINT,
        httpLinkOptions: {
          headers: {
            'Authorization' : 'bearer a50f284abf8672542833fde1d9d595d753b0d58d4d19265885e3bcc7ef222ae2afe7a5fed99e3f48f5d10c7e4d4f55ed027ff76222d000be7edea56d848b44a9e5c868d859ef7b0c44a7738e95e05d2c2e9f90abf7b29a7eaa119818dbe2ef64ea5366316e4d4f8613f0cc9caae72da7f34b99cea7b428af8efbfa21114bceb1'
          }
        }
      }
    }
  },

  env: {
    strapiBaseUri: process.env.API_URL || "http://localhost:1337"
  },
}
