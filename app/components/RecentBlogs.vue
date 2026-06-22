<script setup>
const props = defineProps({
  homepage: {
    type: Object,
    required: true
  },
  blogs: {
    type: Array,
    required: true
  }
})

const config = useRuntimeConfig()
const getImageUrl = (id) => id ? `${config.public.directusUrl}/assets/${id}` : ''
</script>

<template>
  <section class="recent-blogs">
    <div class="heading">
      <h2>{{ homepage.recent_blog_title }}</h2>
      <p>{{ homepage.recent_blog_description }}</p>

      <NuxtLink to="/blog" class="view-all-btn">
        View All
      </NuxtLink>
    </div>

    <div class="blogs-cards">
      <article v-for="blog in blogs" :key="blog.id" class="blog-card">
        <img v-if="blog.cover_image" :src="getImageUrl(blog.cover_image)" class="card-image" />

        <h3>{{ blog.title }}</h3>
        <p>{{ blog.quote }}</p>

        <div class="blog-footer">
          <div class="author">
            <img v-if="blog.author_image" :src="getImageUrl(blog.author_image)" alt="Author" class="author-img" />
            <span>{{ blog.author_name }}</span>
          </div>

          <span class="date">{{ blog.published_date }}</span>
          <NuxtLink :to="`/blog/${blog.id}`" class="btn">
            Read More
          </NuxtLink>
        </div>
      </article>
    </div>
  </section>
</template>
