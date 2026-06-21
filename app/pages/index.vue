<script setup>
import Hero from '~/components/Hero.vue'
import Services from '~/components/Services.vue'

const { $directus, $readItem } = useNuxtApp()

const { data: homepage, error } = await useAsyncData('homepage', () =>
  $directus.request(
    $readItem('homepage', 1, {
      fields: [
        '*',
        'service_cards.id',
        'service_cards.title',
        'service_cards.description',
        'service_cards.image',
        'service_cards.offer_text',
        'service_cards.button_text',
        'service_cards.button_link'
      ]
    })
  )
)
</script>

<template>
  <main>
    <Hero v-if="homepage" :hero="homepage" />
    <Services v-if="homepage?.service_cards?.length" :services="homepage" />
    <pre v-if="error">Error: {{ error }}</pre>
  </main>
</template>
