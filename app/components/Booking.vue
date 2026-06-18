<template>
  <section class="booking">
    <h2>{{ data?.booking_title }}</h2>
    <p>{{ data?.booking_description }}</p>
    <NuxtLink v-if="data?.booking_button_link" :to="data.booking_button_link">
      {{ data?.booking_button_text }}
    </NuxtLink>

    <div v-if="data?.pickup_locations?.length" class="pickup-locations">
      <h3>Pickup Locations</h3>
      <ul>
        <li v-for="location in data.pickup_locations" :key="location.id">
          {{ location.name }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ data: Object })
</script>
