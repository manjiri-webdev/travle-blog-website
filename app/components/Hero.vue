<script setup>
const props = defineProps({
  hero: {
    type: Object,
    required: true
  }
})

const { $directus } = useNuxtApp()
</script>

<template>
  <section class="hero" :style="{
    backgroundImage: hero.hero_background_image
      ? `url(${$directus.files.getUrl(hero.hero_background_image)})`
      : 'none'
  }">
    <div class="overlay">
      <h1>{{ hero.hero_title }}</h1>
      <NuxtLink :to="hero.hero_button_link">
        <button class="cta">{{ hero.hero_button_text }}</button>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* hero section */
.hero {
  height: 100vh;
  top: 0;
  z-index: 100;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.overlay {
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
  border-radius: 8px;
}

.overlay h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.btnlink {
  text-decoration: none;
  color: white;
  font-size: 1rem;
}

.cta {
  background: #007bff;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-radius: 4px;
}

.cta:hover {
  background: #0056b3;
}
</style>
