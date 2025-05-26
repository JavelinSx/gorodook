<template>
    <section class="py-16 bg-gray-50">
        <div class="container-custom">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-800 fade-down">
                Квартиры посуточно в Мирном Архангельской области
            </h2>
            <p class="text-center text-gray-600 mb-12 max-w-3xl mx-auto fade-down" style="animation-delay: 0.1s;">
                Снять квартиру в Мирном без посредников недорого. Однокомнатные и двухкомнатные
                квартиры на сутки в центре города. Все квартиры посуточно оборудованы современной техникой и мебелью.
            </p>

            <div v-if="!isLoading && apartments.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ApartmentCard v-for="(apartment, index) in apartments" :key="apartment.id" :apartment="apartment"
                    :index="index" animation="fade-up" />
            </div>

            <div v-else-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ApartmentCardSkeleton v-for="i in 3" :key="`skeleton-${i}`" />
            </div>

            <div class="text-center mt-10 fade-up" style="animation-delay: 0.5s;">
                <NuxtLink to="/apartments"
                    class="btn bg-cyan-600 text-white hover:bg-cyan-700 px-8 py-3 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                    Смотреть все квартиры в Мирном
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Apartment } from '~/store/apartmentStore'

interface Props {
    apartments: Apartment[]
    isLoading: boolean
}

defineProps<Props>()
</script>