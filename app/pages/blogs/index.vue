<script setup>
const { $directus, $readItems } = useNuxtApp()
const config = useRuntimeConfig()

const { data: blogs, error } = await useAsyncData('all-blogs', () =>
  $directus.request(
    $readItems('blog', {
      fields: ['id', 'title', 'quote', 'cover_image', 'author_name', 'author_image', 'published_date'],
      sort: ['-published_date']
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
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

const cardColors = ['card-color-1', 'card-color-2', 'card-color-3']

useHead({ title: 'Blog | Travel Stories & Tips' })
</script>

<template>
  <main>
    <section class="blogs-page">

      <div class="blogs-page-header">
        <h1>Travel Stories & Tips</h1>
        <p>Explore destinations, itineraries, and travel advice from our writers around the world.</p>
      </div>

      <div v-if="error" class="blogs-error">
        Failed to load blogs. Please try again.
      </div>

      <div v-else-if="blogs && blogs.length" class="blogs-grid">
        <NuxtLink
          v-for="(blog, index) in blogs"
          :key="blog.id"
          :to="`/blog/${blog.id}`"
          class="blog-card-link"
          :class="cardColors[index % 3]"
        >
          <div class="blog-card-img">
            <img
              v-if="blog.cover_image"
              :src="getImageUrl(blog.cover_image)"
              :alt="blog.title"
            />
          </div>
          <div class="blog-card-body">
            <h3>{{ blog.title }}</h3>
            <p v-if="blog.quote" class="blog-card-quote">{{ blog.quote }}</p>
            <div class="blog-card-meta">
              <div class="blog-card-author">
                <div class="author-avatar-sm">
                  <img
                    v-if="blog.author_image"
                    :src="getImageUrl(blog.author_image)"
                    :alt="blog.author_name"
                  />
                  <span v-else>{{ getInitials(blog.author_name) }}</span>
                </div>
                <span>{{ blog.author_name }}</span>
              </div>
              <span v-if="blog.published_date" class="blog-card-date">
                {{ formatDate(blog.published_date) }}
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="blogs-empty">
        No blog posts found.
      </div>

    </section>
  </main>
</template>