<template>
    <section class="py-16 bg-white">
        <div class="container-custom">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="slide-in-left">
                    <h2 class="text-3xl md:text-4xl font-bold mb-6 text-cyan-800">
                        Аренда жилья в Мирном Архангельской области
                    </h2>
                    <p class="text-gray-700 mb-4 text-lg">
                        Мирный - это современный город в Архангельской области с развитой инфраструктурой.
                        Наши квартиры расположены в самых удобных районах города, рядом с:
                    </p>
                    <ul class="space-y-3 text-gray-700 mb-6">
                        <li v-for="feature in cityFeatures" :key="feature" class="flex items-center">
                            <Icon name="i-heroicons-check-circle" class="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                            {{ feature }}
                        </li>
                    </ul>
                    <p class="text-gray-700 mb-6">
                        Идеально подходит для командировочных, специалистов предприятий, туристов и всех,
                        кому необходимо комфортное временное жилье в Мирном.
                    </p>
                    <NuxtLink to="/about"
                        class="btn bg-transparent border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white px-6 py-3 rounded-lg transition-all duration-300">
                        Узнать больше о нас
                    </NuxtLink>
                </div>

                <div class="slide-in-right">
                    <div class="relative">
                        <img src="/img/about-us.png" alt="Квартиры в Мирном Архангельской области"
                            class="w-full rounded-lg shadow-lg transform transition-transform duration-700 hover:scale-105">
                        <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-100 rounded-lg -z-10" />
                        <div class="absolute -top-6 -right-6 w-32 h-32 bg-accent-100 rounded-lg -z-10" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
// Особенности города и расположения
const cityFeatures = [
    'Торговыми центрами и продуктовыми магазинами',
    'Остановками общественного транспорта',
    'Административными зданиями и офисами',
    'Кафе, ресторанами и местами отдыха'
]
</script>