<!-- pages/apartments/index.vue -->
<template>
    <div class="apartments-page">
        <!-- Page Header -->
        <section class="bg-cyan-800 text-white py-12 relative overflow-hidden">
            <div class="absolute inset-0 opacity-30 bg-[url('/img/hero-bg.jpg')] bg-cover bg-center" />
            <div class="absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-800/50" />

            <div class="container-custom relative z-10">
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
        <section class="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
            <div class="container-custom py-4">
                <div class="flex flex-wrap items-center gap-4">
                    <!-- Room Filter -->
                    <div class="filter-group">
                        <label class="text-sm font-medium text-gray-700 block mb-1">Комнаты</label>
                        <div class="flex gap-2">
                            <button class="filter-btn" :class="filters.rooms === null ? 'filter-btn-active' : ''"
                                :disabled="isTransitioning" @click="setRoomFilter(null)">
                                Все
                            </button>
                            <button class="filter-btn" :class="filters.rooms === 1 ? 'filter-btn-active' : ''"
                                :disabled="isTransitioning" @click="setRoomFilter(1)">
                                1
                            </button>
                            <button class="filter-btn" :class="filters.rooms === 2 ? 'filter-btn-active' : ''"
                                :disabled="isTransitioning" @click="setRoomFilter(2)">
                                2
                            </button>
                        </div>
                    </div>

                    <!-- Balcony Filter -->
                    <div class="filter-group">
                        <label class="text-sm font-medium text-gray-700 block mb-1">Балкон</label>
                        <div class="flex gap-2">
                            <button class="filter-btn" :class="filters.hasBalcony === null ? 'filter-btn-active' : ''"
                                :disabled="isTransitioning" @click="setBalconyFilter(null)">
                                Все
                            </button>
                            <button class="filter-btn" :class="filters.hasBalcony === true ? 'filter-btn-active' : ''"
                                :disabled="isTransitioning" @click="setBalconyFilter(true)">
                                С балконом
                            </button>
                            <button class="filter-btn" :class="filters.hasBalcony === false ? 'filter-btn-active' : ''"
                                :disabled="isTransitioning" @click="setBalconyFilter(false)">
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
                                :disabled="isTransitioning" @click="setAreaFilter(null, null)">
                                Все
                            </button>
                            <button class="filter-btn"
                                :class="filters.minArea === 20 && filters.maxArea === 30 ? 'filter-btn-active' : ''"
                                :disabled="isTransitioning" @click="setAreaFilter(20, 30)">
                                20-30 м²
                            </button>
                            <button class="filter-btn"
                                :class="filters.minArea === 30 && filters.maxArea === 40 ? 'filter-btn-active' : ''"
                                :disabled="isTransitioning" @click="setAreaFilter(30, 40)">
                                30-40 м²
                            </button>
                            <button class="filter-btn"
                                :class="filters.minArea === 40 && filters.maxArea === null ? 'filter-btn-active' : ''"
                                :disabled="isTransitioning" @click="setAreaFilter(40, null)">
                                40+ м²
                            </button>
                        </div>
                    </div>

                    <!-- Reset Filters -->
                    <button
                        class="ml-auto text-sm text-cyan-600 hover:text-cyan-700 flex items-center transition-all duration-200 transform hover:translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="isTransitioning" @click="resetFilters">
                        <Icon name="i-heroicons-x-circle" class="h-4 w-4 mr-1" />
                        Сбросить фильтры
                    </button>
                </div>
            </div>
        </section>

        <!-- Apartments Listing -->
        <section class="py-12 bg-gray-50 min-h-[500px]">
            <div class="container-custom">
                <!-- Loading State (initial load) -->
                <div v-if="isLoading" class="text-center py-10">
                    <Icon name="i-heroicons-arrow-path" class="h-10 w-10 mx-auto animate-spin text-cyan-500" />
                    <p class="mt-4 text-lg text-gray-600">Загрузка квартир...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="text-center py-10">
                    <Icon name="i-heroicons-exclamation-triangle" class="h-10 w-10 mx-auto text-red-500" />
                    <p class="mt-4 text-lg text-red-600">{{ error }}</p>
                </div>

                <!-- Main Content -->
                <div v-else>
                    <!-- Results Count -->
                    <Transition name="fade">
                        <p v-if="!showSkeleton" class="text-gray-600 mb-6">
                            Найдено квартир: {{ filteredApartments.length }}
                        </p>
                    </Transition>

                    <!-- Skeletons during transition -->
                    <Transition name="fade">
                        <div v-if="showSkeleton" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <ApartmentCardSkeleton v-for="i in skeletonCount" :key="`skeleton-${i}`" />
                        </div>
                    </Transition>

                    <!-- No Results -->
                    <Transition name="fade">
                        <div v-if="!showSkeleton && filteredApartments.length === 0" class="text-center py-10">
                            <Icon name="i-heroicons-face-frown" class="h-10 w-10 mx-auto text-gray-400" />
                            <p class="mt-4 text-lg text-gray-600">Нет квартир, соответствующих выбранным фильтрам</p>
                            <button class="mt-4 text-cyan-600 hover:text-cyan-700 flex items-center mx-auto"
                                @click="resetFilters">
                                <Icon name="i-heroicons-arrow-path" class="h-4 w-4 mr-1" />
                                Сбросить фильтры
                            </button>
                        </div>
                    </Transition>

                    <!-- Apartments Grid -->
                    <Transition name="fade">
                        <div v-if="!showSkeleton && filteredApartments.length > 0"
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <TransitionGroup name="apartment">
                                <ApartmentCard v-for="(apartment, index) in filteredApartments" :key="apartment.id"
                                    :apartment="apartment" :index="index" animation="scale-in"
                                    :style="{ '--animation-index': index }" />
                            </TransitionGroup>
                        </div>
                    </Transition>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/store/apartmentStore'
import { useApartmentFilters } from '~/composables/useApartmentFilters'

// Set metadata
useHead({
    title: 'Квартиры | Городок',
    meta: [
        { name: 'description', content: 'Аренда комфортабельных квартир в городе Мирный. Выберите подходящий вариант из нашего каталога квартир.' }
    ],
})

// Get store data
const apartmentStore = useApartmentStore()
const { apartments, isLoading, error } = storeToRefs(apartmentStore)

// Use filters composable
const {
    filters,
    filteredApartments,
    isTransitioning,
    showSkeleton,
    setRoomFilter,
    setBalconyFilter,
    setAreaFilter,
    resetFilters,
} = useApartmentFilters(apartments)

// Calculate skeleton count based on current filters
const skeletonCount = computed(() => {
    // Show fewer skeletons if we have active filters
    const hasActiveFilters = filters.rooms !== null ||
        filters.hasBalcony !== null ||
        filters.minArea !== null ||
        filters.maxArea !== null

    return hasActiveFilters ? 3 : 6
})

// Fetch apartments on mount
onMounted(() => {
    apartmentStore.fetchApartments()
})
</script>

<style scoped>
.filter-group {
    min-width: 120px;
}

/* Filter button styles */
.filter-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    border-radius: 0.375rem;
    border: 1px solid rgb(209 213 219);
    color: rgb(55 65 81);
    transition: all 0.2s ease;
}

.filter-btn:hover {
    border-color: rgb(6 182 212);
    color: rgb(6 182 212);
}

.filter-btn-active {
    background-color: rgb(6 182 212);
    color: white;
    border-color: rgb(6 182 212);
}

.filter-btn-active:hover {
    background-color: rgb(3 105 161);
    border-color: rgb(3 105 161);
}

.filter-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.filter-btn:disabled:hover {
    border-color: rgb(209 213 219);
    color: rgb(55 65 81);
}

/* Fade transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Apartment card animations */
.apartment-enter-active {
    transition: all 0.5s ease;
    transition-delay: calc(var(--animation-index, 0) * 100ms);
}

.apartment-enter-from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
}

.apartment-leave-active {
    transition: all 0.3s ease;
    position: absolute;
}

.apartment-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.apartment-move {
    transition: transform 0.5s ease;
}

/* Responsive grid adjustments for absolute positioning */
@media (min-width: 768px) {
    .apartment-leave-active {
        width: calc(50% - 1rem);
    }
}

@media (min-width: 1024px) {
    .apartment-leave-active {
        width: calc(33.333% - 1.333rem);
    }
}
</style>