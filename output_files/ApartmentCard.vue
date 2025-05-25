<template>
    <div class="apartment-card card group" :class="animationClass" :style="{ 'animation-delay': `${index * 0.1}s` }">
        <!-- Image Slider -->
        <div class="relative h-56 overflow-hidden rounded-t-lg">
            <!-- Using nuxt-swiper web components -->
            <ClientOnly>
                <swiper-container ref="swiperRef" :slides-per-view="1" :space-between="0" :navigation="true"
                    :pagination="true" :loop="true" :autoplay="{ delay: 4000, disableOnInteraction: false }"
                    class="h-full w-full card-swiper">
                    <swiper-slide v-for="(image, idx) in apartment.images" :key="idx">
                        <img :src="image" :alt="`Изображение квартиры ${idx + 1}`"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy">
                    </swiper-slide>
                </swiper-container>
            </ClientOnly>

            <!-- Room Badge -->
            <div
                class="absolute top-4 left-4 z-10 bg-cyan-500 text-white px-2 py-1 rounded-md shadow-sm transform transition-transform duration-300 group-hover:scale-110">
                {{ apartment.rooms }}-комнатная
            </div>
        </div>

        <!-- Content -->
        <div class="p-4">
            <h3 class="text-lg font-bold mb-2 text-cyan-900 transition-colors duration-300 group-hover:text-cyan-700">
                {{ apartment.address }}</h3>
            <p class="text-gray-600 mb-4">{{ apartment.description }}</p>

            <!-- Features -->
            <div class="grid grid-cols-2 gap-2 mb-4">
                <div class="flex items-center text-gray-700 transition-transform duration-200 hover:translate-x-1">
                    <Icon name="i-heroicons-squares-2x2" class="h-5 w-5 mr-2 text-cyan-500" />
                    <span>{{ apartment.options[0].scale }} м²</span>
                </div>
                <div class="flex items-center text-gray-700 transition-transform duration-200 hover:translate-x-1">
                    <Icon name="i-heroicons-building-office-2" class="h-5 w-5 mr-2 text-cyan-500" />
                    <span>{{ apartment.options[0].floor }}/{{ apartment.options[0].floorMax }} этаж</span>
                </div>
                <div class="flex items-center text-gray-700 transition-transform duration-200 hover:translate-x-1">
                    <Icon :name="apartment.options[0].balcony ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                        class="h-5 w-5 mr-2"
                        :class="apartment.options[0].balcony ? 'text-green-500' : 'text-red-500'" />
                    <span>{{ apartment.options[0].balcony ? 'Балкон' : 'Без балкона' }}</span>
                </div>
                <div v-if="apartment.nearby.length"
                    class="flex items-center text-gray-700 transition-transform duration-200 hover:translate-x-1">
                    <Icon name="i-heroicons-shopping-bag" class="h-5 w-5 mr-2 text-cyan-500" />
                    <span>Магазины рядом</span>
                </div>
            </div>

            <!-- Button -->
            <NuxtLink :to="`/apartments/${apartment.id}`"
                class="btn btn-cyan w-full text-center transition-all duration-300 hover:shadow-md transform hover:translate-y-[-2px]">
                Подробнее
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'

// Define props
const props = defineProps({
    apartment: {
        type: Object,
        required: true
    },
    index: {
        type: Number,
        default: 0
    },
    animation: {
        type: String,
        default: 'fade-up'
    }
})

// Optional animation class based on props
const animationClass = computed(() => {
    return props.animation || 'fade-up'
})

// Set a default index if not provided
const index = computed(() => props.index || 0)

// Swiper reference
const swiperRef = ref(null)
</script>

<style>
/* Card styling */
swiper-slide {
    height: 100%;
    width: 100%;
}

/* Custom style for navigation arrows in cards */
.card-swiper .swiper-button-next,
.card-swiper .swiper-button-prev {
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: background-color 0.3s ease;
    opacity: 0;
}

.card-swiper:hover .swiper-button-next,
.card-swiper:hover .swiper-button-prev {
    opacity: 1;
}

.card-swiper .swiper-button-next:hover,
.card-swiper .swiper-button-prev:hover {
    background-color: rgba(0, 0, 0, 0.5);
}

.card-swiper .swiper-button-next::after,
.card-swiper .swiper-button-prev::after {
    font-size: 14px;
}

/* Pagination in cards */
.card-swiper .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.6);
    opacity: 0.7;
    transition: all 0.3s ease;
}

.card-swiper .swiper-pagination-bullet-active {
    background-color: white;
    opacity: 1;
    transform: scale(1.2);
}
</style>