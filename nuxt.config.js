export default {
  target: 'static',

  generate: {
    fallback: true,
  },

  server: {
    // host: '0.0.0.0', // default: localhost
  }, // other configs
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Révolution Empire 67',

    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'revolution-empire-67 est un blog qui essaye de relater les évènements militaires qui se sont déroulés durant la période de la Révolution Française et du 1er Empire dans le département du Bas-Rhin. Il se subdivise en plusieurs grandes parties présentant le fruit de plusieurs années de recherche.',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/dotenv', '@nuxtjs/eslint-module'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/style-resources', '@nuxtjs/axios', '@nuxtjs/apollo', '@nuxtjs/sitemap'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
        child_process: 'empty',
        net: 'empty',
        tls: 'empty',
      };
    },
    postcss: null,
  },

  styleResources: {
    scss: [
      './assets/scss/variables/*.scss',
      './assets/scss/breakpoints.scss',
      './assets/scss/fonts.scss',
      './assets/scss/fonts-styles.scss',
    ],
  },

  axios: {
    baseURL: process.env.API_ENDPOINT || '',
    headers: {
      common: {
        Authorization:
          'bearer de0692984a21b5e5f68bed1a496f152895038cdc778d9733341a5a7de964f02af0da88e5e5642bf4ddd471856342a5f9403e5aed6d5db5c4789c1c39a3e6952eb8ebc16b242089fad995a73519fdebdd927599941cae3b9bfcbd9864f1281b56d4c7ca945bd870e3208d76b3169fbe9abb608363d9d91d89fe4570b0d1cae281',
      },
    },
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.API_ENDPOINT || '',
        httpLinkOptions: {
          headers: {
            Authorization:
              'bearer de0692984a21b5e5f68bed1a496f152895038cdc778d9733341a5a7de964f02af0da88e5e5642bf4ddd471856342a5f9403e5aed6d5db5c4789c1c39a3e6952eb8ebc16b242089fad995a73519fdebdd927599941cae3b9bfcbd9864f1281b56d4c7ca945bd870e3208d76b3169fbe9abb608363d9d91d89fe4570b0d1cae281',
          },
        },
      },
    },
  },

  sitemap: {
    hostname: 'https://revolution-empire-67.fr',
    routes: {},
  },

  env: {
    strapiBaseUri: process.env.API_URL || 'http://localhost:1337',
  },
};
