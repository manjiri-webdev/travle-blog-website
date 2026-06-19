import { Directus } from '@directus/sdk'

export default defineNuxtPlugin(() => {
  const directus = new Directus(process.env.NUXT_PUBLIC_DIRECTUS_URL)
  return {
    provide: {
      directus
    }
  }
})

