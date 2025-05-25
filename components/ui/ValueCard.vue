<template>
    <AnimatedSection :animation="animation" :delay="delay"
        class="relative flex flex-col items-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center transform group">
        <!-- Иконка -->
        <div :class="iconContainerClass">
            <Icon :name="icon" :class="iconClass" />
        </div>

        <!-- Заголовок -->
        <h3 :class="titleClass">{{ title }}</h3>

        <!-- Описание -->
        <p :class="descriptionClass">{{ description }}</p>

        <!-- Анимированный декоративный элемент -->
        <div v-if="showDecoration"
            class="anim absolute -bottom-3 -left-3 w-8 h-8 bg-cyan-100 rounded-lg -z-10 animate-pulse"
            :style="{ 'animation-delay': `${decorationDelay}s` }" />
    </AnimatedSection>
</template>

<script setup lang="ts">
import AnimatedSection from '~/components/core/AnimatedSection.vue'

interface Props {
    icon: string
    title: string
    description: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'default' | 'advantage' | 'feature'
    animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'bounce-in'
    delay?: number
    showDecoration?: boolean
    decorationDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    variant: 'default',
    animation: 'fade-up',
    delay: 0,
    showDecoration: true,
    decorationDelay: 0
})

// Динамические классы в зависимости от размера и варианта
const iconContainerClass = computed(() => {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20'
    }

    return [
        sizeClasses[props.size],
        'flex items-center justify-center rounded-full bg-cyan-100 mb-4',
        'transition-transform duration-300 group-hover:scale-110'
    ].join(' ')
})

const iconClass = computed(() => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10'
    }

    return [sizeClasses[props.size], 'text-cyan-600'].join(' ')
})

const titleClass = computed(() => {
    const sizeClasses = {
        sm: 'text-lg',
        md: 'text-xl',
        lg: 'text-2xl'
    }

    return [sizeClasses[props.size], 'font-bold mb-3 text-cyan-700'].join(' ')
})

const descriptionClass = computed(() => {
    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    }

    return [sizeClasses[props.size], 'text-gray-600'].join(' ')
})
</script>