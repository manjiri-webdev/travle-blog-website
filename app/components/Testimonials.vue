<template>
  <section class="testimonials">
    <h2>{{ data?.testimonial_section_title }}</h2>
    <div v-for="testimonial in data || []" :key="testimonial.id" class="testimonial">
      <blockquote>{{ testimonial.review }}</blockquote>
      <p><strong>{{ testimonial.name }}</strong>, {{ testimonial.designation }}</p>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ data: Array })
</script>
