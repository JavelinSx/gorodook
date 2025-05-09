<template>
    <div ref="swiperElRef" class="swiper-container">
        <div class="swiper-wrapper">
            <slot />
        </div>
        <!-- Pagination -->
        <div v-if="pagination" class="swiper-pagination" />
        <!-- Navigation buttons -->
        <div v-if="navigation" class="swiper-button-prev" />
        <div v-if="navigation" class="swiper-button-next" />
        <!-- Scrollbar -->
        <div v-if="scrollbar" class="swiper-scrollbar" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar, Autoplay, Zoom, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';

interface Props {
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
    navigation?: boolean;
    pagination?: boolean | Record<string, any>;
    loop?: boolean;
    autoplay?: boolean | Record<string, any>;
    zoom?: boolean | Record<string, any>;
    initialSlide?: number;
    cssMode?: boolean;
    freeMode?: boolean;
    scrollbar?: boolean | Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: false,
    pagination: false,
    loop: false,
    autoplay: false,
    zoom: false,
    initialSlide: 0,
    cssMode: false,
    freeMode: false,
    scrollbar: false
});

const emit = defineEmits(['swiper', 'slideChange', 'update:slide']);

const swiperElRef = ref<HTMLElement | null>(null);
const swiperInstance = ref<Swiper | null>(null);

// Prepare modules based on props
const swiperModules = computed(() => {
    const modules = [];
    if (props.navigation) modules.push(Navigation);
    if (props.pagination) modules.push(Pagination);
    if (props.scrollbar) modules.push(Scrollbar);
    if (props.autoplay) modules.push(Autoplay);
    if (props.zoom) modules.push(Zoom);
    if (props.freeMode) modules.push(FreeMode);
    return modules;
});

// Prepare pagination config
const paginationConfig = computed(() => {
    if (typeof props.pagination === 'object') {
        return props.pagination;
    }
    return { clickable: true };
});

// Prepare autoplay config
const autoplayConfig = computed(() => {
    if (typeof props.autoplay === 'object') {
        return props.autoplay;
    }
    return { delay: 5000, disableOnInteraction: false };
});

// Init Swiper
const initSwiper = () => {
    if (!swiperElRef.value) return;

    try {
        swiperInstance.value = new Swiper(swiperElRef.value, {
            modules: swiperModules.value,
            slidesPerView: props.slidesPerView,
            spaceBetween: props.spaceBetween,
            initialSlide: props.initialSlide,
            loop: props.loop,
            cssMode: props.cssMode,
            freeMode: props.freeMode,

            // Conditionally add features
            navigation: props.navigation ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            } : false,

            pagination: props.pagination ? {
                el: '.swiper-pagination',
                ...paginationConfig.value
            } : false,

            scrollbar: props.scrollbar ? {
                el: '.swiper-scrollbar',
                draggable: true,
                ...(typeof props.scrollbar === 'object' ? props.scrollbar : {})
            } : false,

            autoplay: props.autoplay ? autoplayConfig.value : false,

            zoom: props.zoom ? {
                maxRatio: 3,
                ...(typeof props.zoom === 'object' ? props.zoom : {})
            } : false,

            on: {
                init: (swiper) => {
                    console.log('Swiper initialized');
                    emit('swiper', swiper);
                },
                slideChange: (swiper) => {
                    emit('slideChange', swiper);
                    emit('update:slide', swiper.realIndex);
                }
            }
        });

        console.log('Swiper instance created successfully');
    } catch (err) {
        console.error('Failed to initialize Swiper:', err);
    }
};

// Handle slide changes from external controls
const goToSlide = (index: number) => {
    if (swiperInstance.value) {
        swiperInstance.value.slideTo(index);
    }
};

// Watch for initialSlide changes
watch(() => props.initialSlide, (newValue) => {
    if (swiperInstance.value && newValue !== undefined) {
        swiperInstance.value.slideTo(newValue);
    }
});

onMounted(() => {
    // Small timeout to ensure DOM is ready
    setTimeout(() => {
        initSwiper();
    }, 0);
});

onBeforeUnmount(() => {
    if (swiperInstance.value) {
        swiperInstance.value.destroy(true, true);
        swiperInstance.value = null;
    }
});

// Expose methods to parent
defineExpose({
    swiper: swiperInstance,
    goToSlide
});
</script>

<style>
/* Base swiper styles can be included here if needed */
.swiper-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>