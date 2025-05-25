<template>
    <div class="apartment-detail">
        <div class="container-custom py-8">
            <div class="mb-6">
                <NuxtLink to="/apartments"
                    class="inline-flex items-center text-cyan-600 hover:text-cyan-700 transition-colors duration-200 transform hover:translate-x-[-4px]">
                    <Icon name="i-heroicons-arrow-left" class="h-5 w-5 mr-1" />
                    Назад к списку квартир
                </NuxtLink>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Левая колонка - Слайдер изображений -->
                <div class="lg:col-span-2">
                    <div class="bg-white rounded-lg shadow-sm overflow-hidden group">
                        <!-- Используем Swiper компонент -->
                        <ApartmentSwiper :images="apartment.images" :rooms-count="apartment.rooms"
                            :initial-slide="currentImageIndex" class="apartment-slider"
                            @update:slide="currentImageIndex = $event" @fullscreen="openGallery" />
                    </div>
                </div>

                <!-- Правая колонка - Детали квартиры -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h1 class="text-2xl font-bold mb-4 text-cyan-800">{{ apartment.address }}</h1>

                    <!-- Блок с ценой -->
                    <div class="mb-6 p-4 bg-cyan-50 rounded-lg">
                        <div class="text-2xl font-bold text-cyan-700 mb-1">2 500 ₽ <span
                                class="text-sm font-normal text-gray-500">/ сутки</span></div>
                        <p class="text-sm text-gray-500">При длительной аренде действуют скидки</p>
                    </div>

                    <!-- Основные характеристики -->
                    <div class="mb-6">
                        <h2 class="text-lg font-bold mb-3 text-cyan-700">Характеристики</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="flex items-center text-gray-700">
                                <Icon name="i-heroicons-home" class="h-5 w-5 mr-2 text-cyan-500" />
                                <span>{{ apartment.rooms }}-комнатная</span>
                            </div>
                            <div class="flex items-center text-gray-700">
                                <Icon name="i-heroicons-squares-2x2" class="h-5 w-5 mr-2 text-cyan-500" />
                                <span>{{ apartment.options[0].scale }} м²</span>
                            </div>
                            <div class="flex items-center text-gray-700">
                                <Icon name="i-heroicons-building-office-2" class="h-5 w-5 mr-2 text-cyan-500" />
                                <span>{{ apartment.options[0].floor }}/{{ apartment.options[0].floorMax }} этаж</span>
                            </div>
                            <div class="flex items-center text-gray-700">
                                <Icon
                                    :name="apartment.options[0].balcony ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                                    class="h-5 w-5 mr-2"
                                    :class="apartment.options[0].balcony ? 'text-green-500' : 'text-red-500'" />
                                <span>{{ apartment.options[0].balcony ? 'Балкон' : 'Без балкона' }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Описание -->
                    <div class="mb-6">
                        <h2 class="text-lg font-bold mb-3 text-cyan-700">Описание</h2>
                        <p class="text-gray-700">{{ apartment.fullDescription }}</p>
                    </div>

                    <!-- Близлежащие места -->
                    <div v-if="apartment.nearby.length" class="mb-6">
                        <h2 class="text-lg font-bold mb-3 text-cyan-700">Рядом</h2>
                        <div class="flex items-center space-x-3">
                            <img v-for="(icon, index) in apartment.nearby" :key="index" :src="icon" alt="Place nearby"
                                class="h-8 w-8" loading="lazy">
                        </div>
                    </div>

                    <!-- Кнопки действий -->
                    <div class="mt-8 space-y-3">
                        <NuxtLink :to="`/contacts?apartmentId=${apartmentId}`"
                            class="btn w-full bg-cyan-600 text-white hover:bg-cyan-700 py-3 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                            <Icon name="i-heroicons-phone" class="h-5 w-5 mr-2" />
                            Забронировать
                        </NuxtLink>
                        <a :href="apartment.mapRoute" target="_blank"
                            class="btn w-full bg-white border border-cyan-600 text-cyan-600 hover:bg-cyan-50 py-3 flex items-center justify-center transition-all duration-300">
                            <Icon name="i-heroicons-map" class="h-5 w-5 mr-2" />
                            Проложить маршрут
                        </a>
                    </div>
                </div>
            </div>

            <!-- Раздел с картой -->
            <div class="mt-12">
                <h2 class="text-2xl font-bold mb-6 text-cyan-800 fade-in">Расположение</h2>
                <div
                    class="h-96 bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] fade-up">
                    <iframe :src="apartment.mapLink" width="100%" height="100%" frameborder="0" allowfullscreen />
                </div>
            </div>

            <!-- Похожие квартиры -->
            <div v-if="similarApartments.length" class="mt-16">
                <h2 class="text-2xl font-bold mb-8 text-cyan-800 fade-in">Похожие квартиры</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ApartmentCard v-for="(similarApt, index) in similarApartments" :key="similarApt.id"
                        :apartment="similarApt" :index="index" animation="fade-up" />
                </div>
            </div>
        </div>

        <!-- Полноэкранная галерея -->
        <FullscreenGallery :images="apartment.images" :is-open="isGalleryOpen" :initial-slide="currentImageIndex"
            @close="closeGallery" @update:slide="currentImageIndex = $event" />
    </div>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/store/apartmentStore'
import type { Apartment } from '~/store/apartmentStore'
import FullscreenGallery from './FullscreenGallery.vue'
// Get the apartment ID from the route
const route = useRoute()
const apartmentId = route.params.id as string

// Get store access and apartment data
const apartmentStore = useApartmentStore()
const { isLoading, error } = storeToRefs(apartmentStore)

// Get apartment by ID
const apartment = computed(() => {
    return apartmentStore.getApartmentById(apartmentId) as Apartment
})

// Get similar apartments (same room count, excluding current)
const similarApartments = computed(() => {
    if (!apartment.value) return []

    return apartmentStore.apartments
        .filter(apt =>
            apt.id !== apartmentId &&
            apt.rooms === apartment.value.rooms
        )
        .slice(0, 3)
})

// Handle image carousel state
const currentImageIndex = ref(0)
const isGalleryOpen = ref(false)

// Gallery methods
const openGallery = (index?: number) => {
    if (index !== undefined) {
        currentImageIndex.value = index
    }
    isGalleryOpen.value = true
}

const closeGallery = () => {
    isGalleryOpen.value = false
}

// Set page metadata
useHead(() => ({
    title: apartment.value ? `${apartment.value.address} | Городок` : 'Квартира | Городок',
    meta: [
        {
            name: 'description',
            content: apartment.value
                ? `${apartment.value.fullDescription.substring(0, 160)}...`
                : 'Аренда комфортабельных квартир в городе Мирный'
        }
    ],
}))

// Check if apartment exists, redirect if not
onMounted(() => {
    if (!apartment.value && !isLoading.value) {
        navigateTo('/apartments')
    }

    // Use IntersectionObserver for scroll animations
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-up');

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
/* Add visible class to control animations */
.fade-in,
.fade-up {
    opacity: 0;
    visibility: hidden;
}

.fade-in.visible,
.fade-up.visible {
    opacity: 1;
    visibility: visible;
}

.fade-up {
    transform: translateY(20px);
}

.fade-up.visible {
    transform: translateY(0);
}

/* Transition properties */
.fade-in,
.fade-up {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out, visibility 0.8s ease-out;
}
</style>