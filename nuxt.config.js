export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#39b982' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {
      src: '@plugins/base-components.js'
    },
    {
      src: '@plugins/vuelidate.js'
    },
    {
      src: '@/plugins/bootstrap-vue'
    },
    {
      src: '@/plugins/vue-lazyload'
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/dotenv', '@nuxtjs/pwa'],
  /*
   ** Axios module configuration
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    cssSourceMap: false,
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  icon: {
    iconSrc: './static/icon.png'
  },
  /*
   ** Progressive Web App
   */
  pwa: {
    manifest: {
      name: 'Demo PWA Nuxt.js by Varian Hermianto',
      short_name: 'demopwanuxt',
      lang: 'id',
      display: 'standalone'
    }
  }
}
