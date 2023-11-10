// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/scss/app.scss'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_BASE_URL
    }
  },
  modules: [
    '@pinia/nuxt'
  ]
})
