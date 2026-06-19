<script setup>
const { $directus } = useNuxtApp()

const { data: homepage } = await useAsyncData('homepage', () =>
  $directus.items('homepage').readByQuery({
    limit: 1,
    fields: [
      'hero_title',
      'hero_button_text',
      'hero_background_image',
      'hero_button_link'
    ]
  })
)
</script>

<template>
  <div v-if="homepage?.data?.[0]">
    <Hero :hero="homepage.data[0]" />
  </div>
  <div v-else>
    <p>Loading hero section...</p>
  </div>
</template>
