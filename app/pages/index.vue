<template>
  <main>
    <Hero v-if="homepage" :data="homepage" />
    <Services v-if="homepage?.service_cards?.length" :data="homepage.service_cards" />
    <Booking v-if="homepage" :data="homepage" />
    <RecentBlogs v-if="blogs?.length" :data="blogs" />
    <Testimonials v-if="homepage?.testimonials?.length" :data="homepage.testimonials" />
  </main>
</template>

<script setup>
import Hero from '~/components/Hero.vue'
import Services from '~/components/Services.vue'
import Booking from '~/components/Booking.vue'
import RecentBlogs from '~/components/RecentBlogs.vue'
import Testimonials from '~/components/Testimonials.vue'

const { $directus, $readItem, $readItems } = useNuxtApp()

const { data: homepage } = await useAsyncData('homepage', () =>
  $directus.request(
    $readItem('homepage', 1, {
      fields: [
        '*',               
        'service_cards.id',
        'service_cards.title',
        'service_cards.description',
        'service_cards.image',
        'service_cards.offer_text',
        'service_cards.button_text',
        'service_cards.button_link', 
        'testimonials.*',   
        'pickup_locations.*' 
      ]
    })
  )
)

const { data: blogs } = await useAsyncData('blogs', () =>
  $directus.request(
    $readItems('blog', {
      fields: ['id', 'title', 'quote', 'cover_image', 'author_name', 'published_date'],
      sort: ['-published_date'],
      limit: 3
    })
  )
)
</script>
