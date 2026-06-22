<script setup>
const props = defineProps({
    nav: {
        type: Object,
        required: true
    }
})

const config = useRuntimeConfig()
const getImageUrl = (id) => id ? `${config.public.directusUrl}/assets/${id}` : ''
</script>

<template>
    <nav class="navbar">
        <div class="branding">
            <img v-if="nav.logo" :src="getImageUrl(nav.logo)" alt="Logo" class="logo" />
            <h2>{{ nav.site_name }}</h2>
        </div>

        <div class="links">
            <NuxtLink v-for="link in nav.navigation_links" :key="link.id" :to="link.url" class="nav-item"
                style="color: black">
                {{ link.label }}
            </NuxtLink>
        </div>

        <div class="actions">
            <NuxtLink to="/signup" class="sign-in">Sign up</NuxtLink>
        </div>

    </nav>
</template>
