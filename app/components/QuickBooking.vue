<script setup>
const props = defineProps({
  booking: {
    type: Object,
    required: true
  }
})

const travelers = ['1 Traveler', '2 Travelers', '3 Travelers', '4 Travelers', '5+ Travelers']

const form = reactive({
  checkIn: '',
  checkOut: '',
  travelers: ''
})

const status = ref('')
const loading = ref(false)

const today = computed(() => new Date().toISOString().split('T')[0])

async function handleBooking() {
  if (!form.checkIn || !form.checkOut || !form.travelers) {
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
        <h2>{{ booking.booking_title }}</h2>
        <p>{{ booking.booking_description }}</p>
      </div>

      <div class="booking-right">

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
            <option v-for="t in travelers" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>

        <div class="booking-row">
          <button class="booking-btn" :disabled="loading" @click="handleBooking">
            {{ loading ? 'Booking...' : booking.booking_button_text || 'Book Now' }}
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