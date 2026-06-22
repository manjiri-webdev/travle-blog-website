import { createDirectus, rest, readSingleton,  readItem,
  readItems } from '@directus/sdk'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const directus = createDirectus(config.public.directusUrl as string).with(rest())

  const getFileUrl = (fileId: string) =>
    `${config.public.directusUrl}/assets/${fileId}`

  return {
    provide: {
      directus,
      readSingleton,
      getFileUrl,
      readItem,
      readItems
    }
  }
})