<template>
  <section class="hero">
    <h1>{{ data?.hero_title }}</h1>
    <p>{{ data?.hero_button_text }}</p>
    <img v-if="data?.hero_background_image" :src="data.hero_background_image" alt="Hero background" />
    <NuxtLink v-if="data?.hero_button_link" :to="data.hero_button_link">
      {{ data?.hero_button_text }}
    </NuxtLink>
  </section>
</template>

<script setup>
const props = defineProps({ data: Object })
</script>
