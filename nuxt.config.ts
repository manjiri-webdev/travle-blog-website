// // https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({
//   compatibilityDate: '2025-07-15',
//   devtools: { enabled: true }
// })
export default defineNuxtConfig({
  routeRules: {
    "/directus/**": { proxy: `${import.meta.env.API_URL}/**` },
  },
})
