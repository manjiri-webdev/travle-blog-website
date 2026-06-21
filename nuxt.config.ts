export default defineNuxtConfig({
  srcDir: 'app/',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      directusUrl: '/directus'
    }
  },

  routeRules: {
    '/directus/**': {
      proxy: `${process.env.NUXT_PUBLIC_DIRECTUS_URL}/**`
    }
  }
})