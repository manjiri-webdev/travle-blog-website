<template>
  <section class="services">
    <h2>{{ data?.[0]?.homepage?.service_title }}</h2>
    <p>{{ data?.[0]?.homepage?.service_description }}</p>

    <div class="cards">
      <div v-for="card in data || []" :key="card.id" class="card">
        <img v-if="card.image" :src="card.image" alt="Service image" class="card-image" />

        <h3>{{ card.title }}</h3>
        <p>{{ card.description }}</p>

        <div class="services-footer">
          <p class="offer">{{ card.offer_text }}</p>
          <NuxtLink v-if="card.button_link" :to="card.button_link" class="btn">
            {{ card.button_text }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ data: Array })
</script>
