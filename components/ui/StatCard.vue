<template>
    <AnimatedSection :animation="animation" :delay="delay"
        class="text-center p-4 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-300 transform group">
        <div class="text-3xl font-bold text-cyan-600 mb-1 transition-transform duration-300 group-hover:scale-110">
            {{ value }}
        </div>
        <div class="text-sm text-gray-600">{{ label }}</div>

        <!-- Анимированный декоративный элемент -->
        <div v-if="showDecoration" class="absolute -bottom-3 -left-3 w-8 h-8 bg-cyan-100 rounded-lg -z-10 animate-float"
            :style="{ 'animation-delay': `${decorationDelay}s` }" />
    </AnimatedSection>
</template>

<script setup lang="ts">
import AnimatedSection from '~/components/core/AnimatedSection.vue'

interface Props {
    value: string
    label: string
    animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'bounce-in'
    delay?: number
    showDecoration?: boolean
    decorationDelay?: number
}

withDefaults(defineProps<Props>(), {
    animation: 'fade-up',
    delay: 0,
    showDecoration: true,
    decorationDelay: 0
})
</script>

<style scoped>
@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}
</style>