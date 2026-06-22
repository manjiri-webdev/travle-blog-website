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
      fields: ['id', 'location_name']
    })
  )
)

const form = reactive({
  pickup_location: '',
  date: '',
  mobile_number: ''
})

const status = ref('')
const errorMsg = ref('')

const today = computed(() => new Date().toISOString().split('T')[0])

async function handleBooking() {
  if (!form.pickup_location || !form.date || !form.mobile_number) {
    status.value = 'error'
    errorMsg.value = 'Please fill in all fields.'
    return
  }

  if (!/^[0-9]{10}$/.test(form.mobile_number)) {
    status.value = 'error'
    errorMsg.value = 'Please enter a valid 10-digit mobile number.'
    return
  }

  status.value = 'loading'
  errorMsg.value = ''

  try {
    await $fetch(`${config.public.directusUrl}/items/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        pickup_location: form.pickup_location,
        date: form.date,
        mobile_number: form.mobile_number
      }
    })

    status.value = 'success'
    form.pickup_location = ''
    form.date = ''
    form.mobile_number = ''

  } catch (err) {
    status.value = 'error'
    errorMsg.value = 'Something went wrong. Please try again.'
    console.error('Booking error:', err)
  }
}
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
          />
          <input
            v-model="form.mobile_number"
            type="tel"
            class="booking-input"
            placeholder="Mobile number"
            maxlength="10"
          />
        </div>

        <div class="booking-row">
          <button
            class="booking-btn"
            :disabled="status === 'loading'"
            @click="handleBooking"
          >
            {{ status === 'loading' ? 'Booking...' : (booking.booking_button_text || 'Book Now') }}
          </button>
        </div>

        <p v-if="status === 'success'" class="booking-success">
          ✓ Booking confirmed! We will contact you shortly.
        </p>
        <p v-if="status === 'error'" class="booking-error">
          {{ errorMsg }}
        </p>

      </div>
    </div>
  </section>
</template>