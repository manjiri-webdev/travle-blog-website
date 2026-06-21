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

<style scoped>
.services {
    padding: 3rem 2rem;
    background: #f9f9f9;
}

.heading {
    text-align: center;
    margin-bottom: 2rem;
}

.heading h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.heading p {
    color: #555;
    max-width: 700px;
    margin: 0 auto;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2rem;
}

.card {
    background: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-image {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
    border-radius: 6px;
}

.card h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

.card p {
    flex-grow: 1;
    color: #444;
}

.services-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
}

.offer {
    font-weight: bold;
    color: #e63946;
}

.btn {
    padding: 0.6rem 1.2rem;
    background: #0070f3;
    color: #fff;
    border-radius: 4px;
    text-decoration: none;
}

.btn:hover {
    background: #005bb5;
}
</style>
