<template>
  <section class="recent-blogs">
    <h2>{{ data?.recent_blog_title }}</h2>
    <p>{{ data?.recent_blog_description }}</p>
    <!-- Later you can loop blog posts here -->
  </section>
</template>

<script setup>
const props = defineProps({ data: Object })
</script>
