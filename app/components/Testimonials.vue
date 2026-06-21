<script setup>
const props = defineProps({
  testimonials: {
    type: Array,
    required: true
  },
  homepage: {
    type: Object,
    required: false
  }
})
</script>

<template>
  <section class="testimonials">
    <div class="heading">
      <h2>{{ homepage?.testimonial_section_title || 'Testimonials' }}</h2>
    </div>

    <div class="cards">
      <div v-for="t in testimonials" :key="t.id" class="card">
        <blockquote v-html="t.review" class="review"></blockquote>
        <footer>
          <h3>{{ t.name }}</h3>
          <span class="designation">{{ t.designation }}</span>
        </footer>
      </div>
    </div>
  </section>
</template>