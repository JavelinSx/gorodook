<template>
    <Teleport to="body">
        <Transition name="gallery-fade">
            <div v-if="isOpen" class="fixed inset-0 z-50 bg-black flex flex-col">
                <!-- Top panel with buttons -->
                <div class="p-4 flex justify-between items-center text-white z-10">
                    <div class="text-sm md:text-base">
                        {{ currentSlide + 1 }} / {{ images.length }}
                    </div>

                    <div class="flex items-center space-x-4">
                        <button class="p-2 rounded-full hover:bg-white/10 transition-colors"
                            :aria-label="isZoomed ? 'Уменьшить' : 'Увеличить'" @click="toggleZoom">
                            <Icon :name="isZoomed ? 'i-heroicons-zoom-out' : 'i-heroicons-zoom-in'" class="h-5 w-5" />
                        </button>

                        <button class="p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Закрыть галерею" @click="close">
                            <Icon name="i-heroicons-x-mark" class="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <!-- Main slider -->
                <div class="flex-grow flex items-center justify-center">
                    <ClientOnly>
                        <swiper-container ref="mainSwiperRef" :slides-per-view="1" :space-between="0" :navigation="true"
                            :pagination="false" :loop="true" :zoom="true" class="fullscreen-swiper w-full h-full"
                            @swiper-init="onMainSwiperInit" @swiper-slide-change="onSlideChange">
                            <swiper-slide v-for="(image, index) in images" :key="index"
                                class="flex items-center justify-center">
                                <div class="swiper-zoom-container">
                                    <NuxtImg :src="image" :alt="`Изображение ${index + 1}`"
                                        class="max-w-full max-h-[calc(100vh-160px)] object-contain" placeholder />
                                </div>
                            </swiper-slide>
                        </swiper-container>
                    </ClientOnly>
                </div>

                <!-- Thumbnails at bottom without Thumbs binding -->
                <div class="py-4 px-2 bg-black/50 overflow-x-auto">
                    <div class="flex gap-2 justify-center">
                        <div v-for="(image, index) in images" :key="`thumb-${index}`"
                            class="cursor-pointer w-20 h-16 rounded overflow-hidden transition-all duration-300 flex-shrink-0"
                            :class="{ 'ring-2 ring-white': currentSlide === index, 'opacity-60 hover:opacity-90': currentSlide !== index }"
                            @click="goToSlide(index)">
                            <NuxtImg :src="image" :alt="`Миниатюра ${index + 1}`" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    images: {
        type: Array,
        required: true
    },
    isOpen: {
        type: Boolean,
        default: false
    },
    initialSlide: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['close', 'update:slide'])

// Refs
const mainSwiperRef = ref(null)

// State
const currentSlide = ref(props.initialSlide)
const isZoomed = ref(false)
const swiper = ref(null)

// Methods
const close = () => {
    emit('close')
}

const toggleZoom = () => {
    isZoomed.value = !isZoomed.value

    if (swiper.value) {
        try {
            if (isZoomed.value) {
                // Enable zoom programmatically
                if (swiper.value.zoom) {
                    swiper.value.zoom.in()
                }
            } else {
                // Disable zoom programmatically
                if (swiper.value.zoom) {
                    swiper.value.zoom.out()
                }
            }
        } catch (error) {
            console.error('Error managing zoom:', error)
        }
    }
}

const goToSlide = (index) => {
    if (swiper.value) {
        swiper.value.slideTo(index)
    }
}

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

    // Reset zoom when changing slides
    isZoomed.value = false

    currentSlide.value = swiperInstance.realIndex
    emit('update:slide', currentSlide.value)
}

// Handle keyboard
const handleKeydown = (event) => {
    if (!props.isOpen) return

    switch (event.key) {
        case 'ArrowLeft':
            if (swiper.value) {
                swiper.value.slidePrev()
            }
            break
        case 'ArrowRight':
            if (swiper.value) {
                swiper.value.slideNext()
            }
            break
        case 'Escape':
            close()
            break
        case ' ':
            toggleZoom()
            event.preventDefault() // Prevent page scrolling when pressing space
            break
    }
}

// Lifecycle
onMounted(() => {
    window.addEventListener('keydown', handleKeydown)

    // Prevent page scrolling when gallery is open
    if (props.isOpen) {
        document.body.style.overflow = 'hidden'
    }

    // Initialize swiper after mount if the gallery is open
    if (props.isOpen) {
        setTimeout(() => {
            if (mainSwiperRef.value && mainSwiperRef.value.swiper) {
                swiper.value = mainSwiperRef.value.swiper
                if (props.initialSlide > 0) {
                    swiper.value.slideTo(props.initialSlide)
                }
            }
        }, 100)
    }
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)

    // Restore scrolling when component is destroyed
    document.body.style.overflow = ''
})

// Watch gallery state
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden'

        // Set initial slide when opening - with a small delay to ensure the swiper is initialized
        setTimeout(() => {
            if (mainSwiperRef.value && mainSwiperRef.value.swiper) {
                swiper.value = mainSwiperRef.value.swiper
                swiper.value.slideTo(props.initialSlide)
            }
        }, 100)
    } else {
        document.body.style.overflow = ''
        isZoomed.value = false
    }
})

// Watch initialSlide
watch(() => props.initialSlide, (newValue) => {
    if (props.isOpen && swiper.value && newValue !== currentSlide.value) {
        swiper.value.slideTo(newValue)
    }
})
</script>

<style>
.gallery-fade-enter-active,
.gallery-fade-leave-active {
    transition: opacity 0.3s ease;
}

.gallery-fade-enter-from,
.gallery-fade-leave-to {
    opacity: 0;
}

swiper-container.fullscreen-swiper {
    height: 100%;
    width: 100%;
}

swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Custom arrows for fullscreen gallery */
.fullscreen-swiper .swiper-button-next,
.fullscreen-swiper .swiper-button-prev {
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    transform: translateY(-50%);
    transition: background-color 0.3s ease;
}

.fullscreen-swiper .swiper-button-next:hover,
.fullscreen-swiper .swiper-button-prev:hover {
    background-color: rgba(0, 0, 0, 0.6);
}

.fullscreen-swiper .swiper-button-next::after,
.fullscreen-swiper .swiper-button-prev::after {
    font-size: 20px;
}
</style>