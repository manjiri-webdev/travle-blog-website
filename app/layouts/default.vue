<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'

const { $directus, $readItem } = useNuxtApp()

// Fetch nav_and_footer singleton (ID = 1)
const { data: navFooter, error: navError, pending } = await useAsyncData('navFooter', () =>
  $directus.request(
    $readItem('nav_and_footer', 1, {
      fields: [
        'site_name',
        'logo',
        'footer_title',
        'footer_description',
        'navigation_links.id',
        'navigation_links.label',
        'navigation_links.url',
        'navigation_links.sort',
        'social_links.id',
        'social_links.platform_name',
        'social_links.icon',
        'social_links.url',
        'social_links.sort'
      ]
    })
  )
)
</script>

<template>
  <div>
    <Navbar v-if="navFooter" :nav="navFooter" />
    <NuxtPage />
    <Footer v-if="navFooter" :footer="navFooter" />

    <!-- Debugging -->
    <pre v-if="navError">Nav/Footer Error: {{ navError }}</pre>
    <pre v-if="pending">Loading nav/footer…</pre>
  </div>
</template>