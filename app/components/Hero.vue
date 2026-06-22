<script setup>
const props = defineProps({
  hero: {
    type: Object,
    required: true
  }
})

const config = useRuntimeConfig()

const imageUrl = computed(() => {
  if (!props.hero?.hero_background_image) return ''
  return `${config.public.directusUrl}/assets/${props.hero.hero_background_image}`
})
</script>

<template>
  <section
    class="hero"
    :style="{
      backgroundImage: imageUrl
        ? `url(${imageUrl})`
        : 'none'
    }"
  >
    <div class="overlay">
      <h1>{{ hero.hero_title }}</h1>

      <NuxtLink :to="hero.hero_button_link">
        <button class="cta">
          {{ hero.hero_button_text }}
        </button>
      </NuxtLink>
      
    </div>
  </section>
</template> 

