<script setup>
const { $directus, $readSingleton } = useNuxtApp()

const { data: homepage, error } = await useAsyncData('homepage', async () => {
  try {
    const result = await $directus.request($readSingleton('homepage'))
    console.log('API result:', result)
    return result
  } catch (err) {
    console.log('caught error:', err)
    return null
  }
}, {
  server: false   // ← force client-side only fetch
})

console.log('homepage:', homepage.value)
console.log('error:', error.value)
</script>

<template>
  <div v-if="homepage">
    <Hero :hero="homepage" />
  </div>
  <div v-else>
    <p>Loading hero section...</p>
  </div>
</template>