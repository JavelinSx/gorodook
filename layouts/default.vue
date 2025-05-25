<template>
    <div class="layout">
        <!-- Header -->
        <AppHeader />

        <!-- Main Content -->
        <main class="min-h-screen">
            <slot />
        </main>

        <!-- Footer -->
        <AppFooter />
    </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue';
import AppFooter from '~/components/layout/AppFooter.vue';
// Layout script
</script>