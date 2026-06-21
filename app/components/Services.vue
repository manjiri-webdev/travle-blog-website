<script setup>
const props = defineProps({
    services: {
        type: Object,
        required: true
    }
})

const config = useRuntimeConfig()

const getImageUrl = (id) => {
    if (!id) return ''
    return `${config.public.directusUrl}/assets/${id}`
}
</script>

<template>
    <section class="services">
        <div class="heading">
            <h1>{{ services.service_title }}</h1>
            <p>{{ services.service_description }}</p>
        </div>

        <div class="cards">
            <div v-for="card in services.service_cards" :key="card.id" class="card">
                <img v-if="card.image" :src="getImageUrl(card.image)" alt="Service image" class="card-image" />

                <h3>{{ card.title }}</h3>
                <p>{{ card.description }}</p>

                <div class="services-footer">
                    <p class="offer">{{ card.offer_text }}</p>
                    <NuxtLink :to="card.button_link">
                        <button class="btn">{{ card.button_text }}</button>
                    </NuxtLink>
                </div>

            </div>
        </div>
    </section>
</template>

