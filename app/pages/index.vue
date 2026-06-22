<script setup>
import { readItem, readItems } from '@directus/sdk'
import Hero from '~/components/Hero.vue'
import Services from '~/components/Services.vue'
import RecentBlogs from '~/components/RecentBlogs.vue'
import QuickBooking from '~/components/QuickBooking.vue'

const { $directus, $readItem, $readItems} = useNuxtApp()

const { data: homepage, error:homepageError } = await useAsyncData('homepage', () =>
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
        'recent_blog_title',
        'recent_blog_description',
        'booking_title',
        'booking_description',
        'booking_button_text',
        'testimonial_section_title',
        'testimonials.id',
        'testimonials.name',
        'testimonials.designation',
        'testimonials.review'
      ]
    })
  )
)

const { data: blogs, error: blogsError } = await useAsyncData('blogs', () =>
  $directus.request(
    $readItems('blog', {
      fields: [
        'id',
        'title',
        'quote',
        'cover_image',
        'author_name',
        'author_image',
        'published_date'
      ],
      sort: ['-published_date'],
      limit: 3
    })
  )
)
</script>

<template>
  <main>
    <Hero v-if="homepage" :hero="homepage" />
    <Services v-if="homepage?.service_cards?.length" :services="homepage" />
    <QuickBooking v-if="homepage" :booking="homepage" />
    <RecentBlogs v-if="homepage && blogs?.length" :homepage="homepage" :blogs="blogs" />
    <Testimonials v-if="homepage?.testimonials?.length" :homepage="homepage" :testimonials="homepage.testimonials" />
    
    <pre v-if="homepageError">Homepage Error: {{ homepageError }}</pre>
    <pre v-if="blogsError">Blogs Error: {{ blogsError }}</pre>
  </main>
</template>