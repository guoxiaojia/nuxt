import pkg from './package'
global.HTMLElement = typeof window === 'undefined' ? Object : window.HTMLElement
export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/base.css',
    'element-ui/lib/theme-chalk/index.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    { src: '@/plugins/mavon-editor', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true // Can be also an object with default options
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Axios module  proxy
  */
  proxy: {
    '/api/': { target: 'http://localhost:8080', pathRewrite: {'^/api/': ''}},
    '/api2/': 'http://api.another-website.com'
  },

  /*
  ** Build configuration
  */
  build: {
    //开启这个就是客户端渲染
    // transpile: [/^element-ui/],
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
