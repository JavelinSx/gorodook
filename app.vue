<template>
  <div class="app min-h-screen flex flex-col">
    <!-- Main Content -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/store/apartmentStore'

// Get store instance
const apartmentStore = useApartmentStore()

// Fetch data once in the main app component
// This ensures data is loaded before any components are mounted
onBeforeMount(async () => {
  // Check if apartments are already loaded
  if (apartmentStore.apartments.length === 0) {
    await apartmentStore.fetchApartments()
  }
})

// Set app metadata
useHead({
  title: 'Городок | Аренда квартир в Мирном',
  meta: [
    { name: 'description', content: 'Аренда комфортабельных квартир в городе Мирный. Чистые уютные квартиры со всем необходимым для проживания.' }
  ],
})
</script>