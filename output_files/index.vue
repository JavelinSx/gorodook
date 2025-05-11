<template>
    <div class="apartments-page">
        <!-- Page Header -->
        <section class="bg-cyan-800 text-white py-12 relative overflow-hidden">
            <div class="absolute inset-0 opacity-30 bg-[url('/img/hero-bg.jpg')] bg-cover bg-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-800/50" />

            <div class="container-custom relative z-10 ">
                <h1 class="text-3xl md:text-4xl font-bold mb-4 text-white fade-in">Наши квартиры</h1>
                <p class="text-lg text-gray-200 max-w-3xl fade-in pb-[20px]" style="animation-delay: 0.1s;">
                    Комфортабельные квартиры в городе Мирный со всем необходимым для проживания. Выберите подходящий
                    вариант из нашего каталога.
                </p>
            </div>

            <!-- Wave bottom -->
            <div
                class="absolute bottom-0 left-0 right-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"
                    class="fill-gray-50 w-full h-[50px] mb-[-1px]">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
                </svg>
            </div>
        </section>

        <!-- Filters Section -->
        <section class="bg-white border-b border-gray-200 top-[72px] z-40 shadow-sm">
            <div class="container-custom py-4">
                <div class="flex flex-wrap items-center gap-4">
                    <!-- Room Filter -->
                    <div class="filter-group">
                        <label class="text-sm font-medium text-gray-700 block mb-1">Комнаты</label>
                        <div class="flex gap-2">
                            <button class="filter-btn" :class="filters.rooms === null ? 'filter-btn-active' : ''"
                                @click="toggleRoomFilter(null)">
                                Все
                            </button>
                            <button class="filter-btn" :class="filters.rooms === 1 ? 'filter-btn-active' : ''"
                                @click="toggleRoomFilter(1)">
                                1
                            </button>
                            <button class="filter-btn" :class="filters.rooms === 2 ? 'filter-btn-active' : ''"
                                @click="toggleRoomFilter(2)">
                                2
                            </button>
                        </div>
                    </div>

                    <!-- Balcony Filter -->
                    <div class="filter-group">
                        <label class="text-sm font-medium text-gray-700 block mb-1">Балкон</label>
                        <div class="flex gap-2">
                            <button class="filter-btn" :class="filters.hasBalcony === null ? 'filter-btn-active' : ''"
                                @click="toggleBalconyFilter(null)">
                                Все
                            </button>
                            <button class="filter-btn" :class="filters.hasBalcony === true ? 'filter-btn-active' : ''"
                                @click="toggleBalconyFilter(true)">
                                С балконом
                            </button>
                            <button class="filter-btn" :class="filters.hasBalcony === false ? 'filter-btn-active' : ''"
                                @click="toggleBalconyFilter(false)">
                                Без балкона
                            </button>
                        </div>
                    </div>

                    <!-- Area Filter -->
                    <div class="filter-group">
                        <label class="text-sm font-medium text-gray-700 block mb-1">Площадь</label>
                        <div class="flex gap-2">
                            <button class="filter-btn"
                                :class="filters.minArea === null && filters.maxArea === null ? 'filter-btn-active' : ''"
                                @click="toggleAreaFilter(null, null)">
                                Все
                            </button>
                            <button class="filter-btn"
                                :class="filters.minArea === 20 && filters.maxArea === 30 ? 'filter-btn-active' : ''"
                                @click="toggleAreaFilter(20, 30)">
                                20-30 м²
                            </button>
                            <button class="filter-btn"
                                :class="filters.minArea === 30 && filters.maxArea === 40 ? 'filter-btn-active' : ''"
                                @click="toggleAreaFilter(30, 40)">
                                30-40 м²
                            </button>
                            <button class="filter-btn"
                                :class="filters.minArea === 40 && filters.maxArea === null ? 'filter-btn-active' : ''"
                                @click="toggleAreaFilter(40, null)">
                                40+ м²
                            </button>
                        </div>
                    </div>

                    <!-- Reset Filters -->
                    <button
                        class="ml-auto text-sm text-cyan-600 hover:text-cyan-700 flex items-center transition-all duration-200 transform hover:translate-x-1"
                        @click="resetAllFilters">
                        <Icon name="i-heroicons-x-circle" class="h-4 w-4 mr-1" />
                        Сбросить фильтры
                    </button>
                </div>
            </div>
        </section>

        <!-- Apartments Listing -->
        <section class="py-12 bg-gray-50 min-h-[500px]">
            <div class="container-custom">
                <!-- Loading State -->
                <div v-if="isLoading" class="text-center py-10">
                    <Icon name="i-heroicons-arrow-path" class="h-10 w-10 mx-auto animate-spin text-cyan-500" />
                    <p class="mt-4 text-lg text-gray-600">Загрузка квартир...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="text-center py-10">
                    <Icon name="i-heroicons-exclamation-triangle" class="h-10 w-10 mx-auto text-red-500" />
                    <p class="mt-4 text-lg text-red-600">{{ error }}</p>
                </div>

                <!-- No Results -->
                <div v-else-if="filteredApartments.length === 0" class="text-center py-10 fade-in">
                    <Icon name="i-heroicons-face-frown" class="h-10 w-10 mx-auto text-gray-400" />
                    <p class="mt-4 text-lg text-gray-600">Нет квартир, соответствующих выбранным фильтрам</p>
                    <button class="mt-4 text-cyan-600 hover:text-cyan-700 flex items-center mx-auto"
                        @click="resetAllFilters">
                        <Icon name="i-heroicons-arrow-path" class="h-4 w-4 mr-1" />
                        Сбросить фильтры
                    </button>
                </div>

                <!-- Apartments Grid -->
                <div v-else>
                    <!-- Results Count -->
                    <p class="text-gray-600 mb-6 slide-in-left">
                        Найдено квартир: {{ filteredApartments.length }}
                    </p>

                    <!-- Apartments Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TransitionGroup name="apartment-card-transition">
                            <ApartmentCard v-for="(apartment, index) in filteredApartments" :key="apartment.id"
                                :apartment="apartment" :index="index" animation="scale-in" />
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useApartmentStore } from '~/store/apartmentStore'
// Set metadata for this page
useHead({
    title: 'Квартиры | Городок',
    meta: [
        { name: 'description', content: 'Аренда комфортабельных квартир в городе Мирный. Выберите подходящий вариант из нашего каталога квартир.' }
    ],
})

// Get store data
const apartmentStore = useApartmentStore()
const { filteredApartments, isLoading, error } = storeToRefs(apartmentStore)
const { filters } = storeToRefs(apartmentStore)

// Filter methods
const toggleRoomFilter = (rooms: number | null) => {
    apartmentStore.setRoomFilter(rooms)
}

const toggleBalconyFilter = (hasBalcony: boolean | null) => {
    apartmentStore.setBalconyFilter(hasBalcony)
}

const toggleAreaFilter = (min: number | null, max: number | null) => {
    apartmentStore.setAreaFilter(min, max)
}

const resetAllFilters = () => {
    apartmentStore.resetFilters()
}

// Use intersection observer for scroll animations
onMounted(() => {
    apartmentStore.fetchApartments()
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .slide-in-left, .scale-in');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }
})
</script>

<style scoped>
.filter-group {
    @apply min-w-[120px];
}

/* Animation for apartment card transitions */
.apartment-card-transition-enter-active,
.apartment-card-transition-leave-active {
    transition: all 0.5s ease;
}

.apartment-card-transition-enter-from,
.apartment-card-transition-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

/* Add visible class to control animations */
.fade-in,
.fade-up,
.slide-in-left,
.scale-in {
    opacity: 0;
    visibility: hidden;
}

.fade-in.visible,
.fade-up.visible,
.slide-in-left.visible,
.scale-in.visible {
    opacity: 1;
    visibility: visible;
}

.fade-up {
    transform: translateY(20px);
}

.fade-up.visible {
    transform: translateY(0);
}

.slide-in-left {
    transform: translateX(-20px);
}

.slide-in-left.visible {
    transform: translateX(0);
}

.scale-in {
    transform: scale(0.9);
}

.scale-in.visible {
    transform: scale(1);
}

/* Transition properties */
.fade-in,
.fade-up,
.slide-in-left,
.scale-in {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out, visibility 0.6s ease-out;
}
</style>