<script setup>
const destinations = [
  'Bali, Indonesia',
  'Paris, France',
  'Santorini, Greece',
  'Tokyo, Japan',
  'New York, USA',
  'Cape Town, South Africa',
  'Maldives',
  'Dubai, UAE',
  'Rome, Italy',
  'Bangkok, Thailand'
]

const travelerOptions = ['1 Traveler', '2 Travelers', '3 Travelers', '4 Travelers', '5+ Travelers']

const form = reactive({
  destination: '',
  checkIn: '',
  checkOut: '',
  travelers: ''
})

const status = ref('')
const loading = ref(false)

const today = computed(() => new Date().toISOString().split('T')[0])

async function handleBooking() {
  if (!form.destination || !form.checkIn || !form.checkOut || !form.travelers) {
    status.value = 'error'
    return
  }
  loading.value = true
  status.value = ''
  await new Promise(r => setTimeout(r, 1200))
  loading.value = false
  status.value = 'success'
}
</script>

<template>
  <section class="booking-section">
    <div class="booking-inner">

      <div class="booking-left">
        <h2>Quick Booking</h2>
        <p>Plan your next adventure in seconds. Choose a destination, pick your dates, and let us handle the rest.</p>
      </div>

      <div class="booking-right">

        <div class="booking-row">
          <select v-model="form.destination" class="booking-select">
            <option value="" disabled>Select Destination</option>
            <option v-for="d in destinations" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>

        <div class="booking-row two-col">
          <input
            v-model="form.checkIn"
            type="date"
            class="booking-input"
            :min="today"
          />
          <input
            v-model="form.checkOut"
            type="date"
            class="booking-input"
            :min="form.checkIn || today"
          />
        </div>

        <div class="booking-row">
          <select v-model="form.travelers" class="booking-select">
            <option value="" disabled>Number of Travelers</option>
            <option v-for="t in travelerOptions" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>

        <div class="booking-row">
          <button class="booking-btn" :disabled="loading" @click="handleBooking">
            {{ loading ? 'Booking...' : 'Book Now' }}
          </button>
        </div>

        <p v-if="status === 'success'" class="booking-success">
          ✓ Booking request sent! We'll reach out shortly.
        </p>
        <p v-if="status === 'error'" class="booking-error">
          Please fill in all fields before booking.
        </p>

      </div>
    </div>
  </section>
</template>