<script setup>
const route = useRoute()
const { $directus, $readItem } = useNuxtApp()
const config = useRuntimeConfig()

const { data: blog, error } = await useAsyncData(`blog-${route.params.id}`, () =>
  $directus.request(
    $readItem('blog', route.params.id, {
      fields: ['id', 'title', 'quote', 'content', 'cover_image', 'author_name', 'author_image', 'published_date']
    })
  )
)

const getImageUrl = (id) => id ? `${config.public.directusUrl}/assets/${id}` : ''

const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

useHead(() => ({
  title: blog.value?.title ? `${blog.value.title} | Travel Blog` : 'Blog'
}))
</script>

<template>
  <main>

    <article v-if="blog" class="blog-detail-page">

      <NuxtLink to="/blog" class="blog-back-link">← Back to all posts</NuxtLink>

      <div class="blog-detail-cover">
        <img
          v-if="blog.cover_image"
          :src="getImageUrl(blog.cover_image)"
          :alt="blog.title"
        />
      </div>

      <div class="blog-detail-body">

        <h1>{{ blog.title }}</h1>

        <div class="blog-detail-author">
          <div class="author-avatar-lg">
            <img
              v-if="blog.author_image"
              :src="getImageUrl(blog.author_image)"
              :alt="blog.author_name"
            />
            <span v-else>{{ getInitials(blog.author_name) }}</span>
          </div>
          <div class="author-info">
            <p class="author-info-name">{{ blog.author_name }}</p>
            <p class="author-info-date">{{ formatDate(blog.published_date) }}</p>
          </div>
        </div>

        <blockquote v-if="blog.quote" class="blog-detail-quote">
          {{ blog.quote }}
        </blockquote>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-if="blog.content" class="blog-detail-content" v-html="blog.content" />

      </div>
    </article>

    <div v-else-if="error" class="blog-detail-error">
      <p>Could not load this blog post.</p>
      <NuxtLink to="/blog" class="blog-back-link">← Back to all posts</NuxtLink>
    </div>

  </main>
</template>