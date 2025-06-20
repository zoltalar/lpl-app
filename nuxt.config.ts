export default defineNuxtConfig({
  auth: {
    baseURL: process.env.NUXT_PUBLIC_API_BASE_URL,
    globalAppMiddleware: true,
    provider: {
      type: 'local',      
      endpoints: {
        signIn: { path: '/admin/authentication/login', method: 'post' },
        signOut: { path: '/admin/authentication/logout', method: 'post' },
        getSession: { path: '/admin/users/current', method: 'get' }
      },
      token: {
        signInResponseTokenPointer: '/access_token',
        maxAgeInSeconds: 28800
      },
      pages: {
        login: '/'
      }
    }
  },
  compatibilityDate: '2025-02-21',
  css: ['~/assets/scss/app.scss'],
  devtools: { enabled: true },
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_APP_URL,
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en-us',
        name: 'English (United States)',
        file: 'en-us.json'
      },
    ],
    defaultLocale: 'en-us',
    compilation: {
      strictMessage: false,
    },
  },
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@sidebase/nuxt-auth'
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_BASE_URL
    }
  },  
  ssr: false, 
})