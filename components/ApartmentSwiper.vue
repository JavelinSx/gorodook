<template>
    <div class="apartment-swiper">
        <!-- Main slider -->
        <ClientOnly>
            <swiper-container ref="mainSwiperRef" :slides-per-view="1" :space-between="0" :navigation="true"
                :pagination="{ clickable: true, dynamicBullets: true }" :loop="true"
                :autoplay="{ delay: 5000, disableOnInteraction: false }" :zoom="true"
                class="main-swiper rounded-lg overflow-hidden shadow-sm" @swiper-init="onMainSwiperInit"
                @swiper-slide-change="onSlideChange">
                <swiper-slide v-for="(image, index) in images" :key="index" class="relative">
                    <div class="swiper-zoom-container">
                        <NuxtImg :src="image" :alt="`Изображение ${index + 1}`"
                            class="w-full h-[350px] sm:h-[450px] md:h-[500px] object-cover" placeholder />
                    </div>

                    <!-- Room badge -->
                    <div v-if="index === 0 && roomsCount"
                        class="absolute top-4 left-4 bg-cyan-500 text-white px-2 py-1 rounded-md shadow-sm transform transition-transform duration-300 hover:scale-110">
                        {{ roomsCount }}-комнатная
                    </div>

                    <!-- Fullscreen button -->
                    <button v-if="enableFullscreen"
                        class="absolute top-4 right-4 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        @click.stop="$emit('fullscreen', index)">
                        <Icon name="i-heroicons-arrows-pointing-out" class="h-5 w-5" />
                    </button>
                </swiper-slide>
            </swiper-container>
        </ClientOnly>

        <!-- Thumbnails (without thumbs binding) -->
        <div v-if="showThumbs && images.length > 1" class="mt-3 flex space-x-2 overflow-x-auto">
            <div v-for="(image, index) in images" :key="`thumb-${index}`"
                class="cursor-pointer h-16 md:h-20 w-20 md:w-24 flex-shrink-0 rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                :class="{ 'ring-2 ring-cyan-500': activeIndex === index, 'opacity-70 hover:opacity-100': activeIndex !== index }"
                @click="goToSlide(index)">
                <NuxtImg :src="image" :alt="`Миниатюра ${index + 1}`" class="w-full h-full object-cover" placeholder />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    roomsCount: {
        type: Number,
        default: null
    },
    showThumbs: {
        type: Boolean,
        default: true
    },
    enableFullscreen: {
        type: Boolean,
        default: true
    },
    initialSlide: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['update:slide', 'fullscreen'])

// Refs
const mainSwiperRef = ref(null)

// State
const activeIndex = ref(props.initialSlide)
const swiper = ref(null)

// Initialize main swiper
const onMainSwiperInit = (event) => {
    swiper.value = event.detail[0]

    // Set initial slide
    if (props.initialSlide > 0 && props.initialSlide < props.images.length) {
        swiper.value.slideTo(props.initialSlide)
    }
}

// Handle slide change
const onSlideChange = (event) => {
    const swiperInstance = event.detail[0]
    activeIndex.value = swiperInstance.realIndex
    emit('update:slide', activeIndex.value)
}

// Go to slide
const goToSlide = (index) => {
    if (swiper.value) {
        swiper.value.slideTo(index)
    }
}

// Watch for initialSlide change
watch(() => props.initialSlide, (newValue) => {
    if (swiper.value && newValue !== activeIndex.value) {
        swiper.value.slideTo(newValue)
    }
})

// Set initial slide when component is mounted
onMounted(() => {
    // The web component may initialize after our component is mounted,
    // so we need to set a small timeout to ensure the swiper instance is ready
    setTimeout(() => {
        if (mainSwiperRef.value && mainSwiperRef.value.swiper) {
            swiper.value = mainSwiperRef.value.swiper
            if (props.initialSlide > 0) {
                swiper.value.slideTo(props.initialSlide)
            }
        }
    }, 100)
})
</script>

<style>
/* Component styling */
swiper-container.main-swiper {
    height: auto;
    width: 100%;
}

swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Custom style for navigation arrows */
.main-swiper .swiper-button-next,
.main-swiper .swiper-button-prev {
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: background-color 0.3s ease;
}

.main-swiper .swiper-button-next:hover,
.main-swiper .swiper-button-prev:hover {
    background-color: rgba(0, 0, 0, 0.5);
}

.main-swiper .swiper-button-next::after,
.main-swiper .swiper-button-prev::after {
    font-size: 18px;
}

/* Pagination */
.main-swiper .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.6);
    opacity: 0.7;
    transition: all 0.3s ease;
}

.main-swiper .swiper-pagination-bullet-active {
    background-color: white;
    opacity: 1;
    transform: scale(1.2);
}

/* Animation for zoom */
.swiper-zoom-container {
    transition: transform 0.3s ease;
}

/* Mobile device arrow adjustments */
@media (max-width: 640px) {

    .main-swiper .swiper-button-next,
    .main-swiper .swiper-button-prev {
        width: 32px;
        height: 32px;
    }

    .main-swiper .swiper-button-next::after,
    .main-swiper .swiper-button-prev::after {
        font-size: 14px;
    }
}
</style>