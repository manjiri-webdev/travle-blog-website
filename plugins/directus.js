import { createDirectus, rest, readItem, readItems } from '@directus/sdk'

const directus = createDirectus(import.meta.env.API_URL).with(rest())

export default defineNuxtPlugin(() => {
  return {
    provide: { directus, readItem, readItems },
  }
})
