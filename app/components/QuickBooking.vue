<script setup>
const props = defineProps({
  booking: {
    type: Object,
    required: true
  }
})

const { $directus, $readItems } = useNuxtApp()
const config = useRuntimeConfig()

const { data: pickupLocations } = await useAsyncData('pickup-locations', () =>
  $directus.request(
    $readItems('pickup_locations', {
      fields: ['id', 'location_name'],
      filter: {
        homepage_id: { _eq: 1 }
      }
    })
  )
)

const form = reactive({
  pickup_location: '',
  date: '',
  mobile: ''
})

const today = computed(() => new Date().toISOString().split('T')[0])
</script>

<template>
  <section class="booking-section">
    <div class="booking-inner">

      <div class="booking-left">
        <h2>{{ booking.booking_title }}</h2>
        <p>{{ booking.booking_description }}</p>
      </div>

      <div class="booking-right">

        <div class="booking-row">
          <select v-model="form.pickup_location" class="booking-select">
            <option value="" disabled>Enter your pickup location</option>
            <option
              v-for="loc in pickupLocations"
              :key="loc.id"
              :value="loc.location_name"
            >
              {{ loc.location_name }}
            </option>
          </select>
        </div>

        <div class="booking-row two-col">
          <input
            v-model="form.date"
            type="date"
            class="booking-input"
            :min="today"
            placeholder="Select date"
          />
          <input
            v-model="form.mobile"
            type="tel"
            class="booking-input"
            placeholder="Mobile number"
          />
        </div>

        <div class="booking-row">
          <button class="booking-btn">
            {{ booking.booking_button_text || 'Book Now' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>