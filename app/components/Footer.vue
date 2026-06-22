<script setup>
const props = defineProps({
  footer: {
    type: Object,
    required: true
  }
})

const config = useRuntimeConfig()
const getImageUrl = (id) => id ? `${config.public.directusUrl}/assets/${id}` : ''
</script>

<template>
  <footer class="footer">
    <div class="footer-nav">
      <NuxtLink
        v-for="link in footer.navigation_links"
        :key="link.id"
        :to="link.url"
        class="nav-item"
      >
        {{ link.label }}
      </NuxtLink>
    </div>

    <div class="social">
      <a
        v-for="social in footer.social_links"
        :key="social.id"
        :href="social.url"
        target="_blank"
        class="social-item"
      >
        <img v-if="social.icon" :src="getImageUrl(social.icon)" alt="Social icon" class="icon" />
        {{ social.platform_name }}
      </a>
    </div>

    <div class="newsletter">
      <h3>{{ footer.footer_title }}</h3>
      <p>{{ footer.footer_description }}</p>
      <form class="newsletter-form">
        <input type="email" placeholder="Enter Your Email" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </footer>
</template>
