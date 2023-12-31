export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Books',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    '@/assets/scss/main.scss', 
    '@/assets/css/main.css',
    '@/assets/css/account.css'
  ],
  // Cấu hình cho Nuxt/content
  content: {
    // Cấu hình khác (nếu có)
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persistedState.client.js' },
    { src: '~/plugins/font-awesome', mode: 'client' }, // Đường dẫn tới plugin Font Awesome
    { src: '~/plugins/tippy.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxt/image',
    '@nuxt/content',
  ],
  axios: {
    // proxy: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // ...
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },
  router: {
    base: '/'
  },
  loading: {
    color: '#7BB11D', // Màu của loading bar
    height: '3px', // Chiều cao của loading bar
    continuous: true, // Hiển thị liên tục
    duration: 3000, // Thời gian tối đa loading (ms)
  },
}
