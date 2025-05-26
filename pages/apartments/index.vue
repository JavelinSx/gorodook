<template>
    <div class="apartments-page">
        <!-- Page Header -->
        <PageHeaderWidget title="Снять квартиру в Мирном посуточно"
            description="Квартиры посуточно в Мирном Архангельской области без посредников. Однокомнатные и двухкомнатные квартиры на сутки в центре города недорого."
            size="md" show-wave />

        <!-- Filters Section -->
        <section class="bg-white border-b border-gray-200 md:sticky top-[60px] z-40 shadow-sm">
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

        <!-- CTA Section -->
        <CTASection variant="apartments" show-decorations />
    </div>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/store/apartmentStore'
import { useApartmentFilters } from '~/composables/useApartmentFilters'

// Components
import PageHeaderWidget from '~/components/widgets/PageHeaderWidget.vue'
import CTASection from '~/components/sections/CTASection.vue'

// Set metadata
useHead({
    title: 'Снять квартиру в Мирном посуточно | Квартиры на сутки недорого',
    meta: [
        {
            name: 'description',
            content: 'Снять квартиру в Мирном Архангельской области посуточно без посредников. Квартиры на сутки недорого в центре города. Однокомнатные и двухкомнатные квартиры посуточно.'
        }
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

// Initialize scroll animations
const { initializeScrollAnimations } = useScrollAnimations()

// Fetch apartments and setup animations on mount
onMounted(() => {
    apartmentStore.fetchApartments()

    const cleanup = initializeScrollAnimations()

    onBeforeUnmount(() => {
        cleanup()
    })
})
</script>

<!-- Все стили теперь в main.css -->