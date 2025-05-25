<template>
    <section :class="sectionClass">
        <!-- Фоновое изображение -->
        <div v-if="backgroundImage" class="absolute inset-0 opacity-30 bg-cover bg-center" :style="backgroundStyle" />

        <!-- Градиентный оверлей -->
        <div :class="overlayClass" />

        <div class="container-custom relative z-10">
            <AnimatedSection animation="fade-in" :tag="titleTag" :class="titleClass">
                {{ title }}
            </AnimatedSection>

            <AnimatedSection v-if="description" animation="fade-in" :delay="0.1" tag="p" :class="descriptionClass">
                {{ description }}
            </AnimatedSection>

            <!-- Дополнительный контент через слот -->
            <div v-if="$slots.default" class="mt-6">
                <AnimatedSection animation="fade-in" :delay="0.2">
                    <slot />
                </AnimatedSection>
            </div>
        </div>

        <!-- Wave разделитель -->
        <WaveDivider v-if="showWave" position="bottom" :fill-color="waveFillColor" :height="waveHeight" />
    </section>
</template>

<script setup lang="ts">
import AnimatedSection from '~/components/core/AnimatedSection.vue'
import WaveDivider from '~/components/core/WaveDivider.vue'

interface Props {
    title: string
    description?: string
    backgroundImage?: string
    backgroundColor?: string
    size?: 'sm' | 'md' | 'lg'
    titleTag?: 'h1' | 'h2' | 'h3'
    showWave?: boolean
    waveFillColor?: string
    waveHeight?: string
    overlayType?: 'gradient' | 'solid' | 'none'
    textAlign?: 'left' | 'center'
}

const props = withDefaults(defineProps<Props>(), {
    backgroundImage: '/img/hero-bg.jpg',
    backgroundColor: 'bg-cyan-800',
    size: 'md',
    titleTag: 'h1',
    showWave: true,
    waveFillColor: 'gray-50',
    waveHeight: '50px',
    overlayType: 'gradient',
    textAlign: 'left'
})

// Стиль фонового изображения
const backgroundStyle = computed(() => {
    if (!props.backgroundImage) return {}
    return {
        backgroundImage: `url('${props.backgroundImage}')`
    }
})

// Классы для секции
const sectionClass = computed(() => {
    const sizeClasses = {
        sm: 'pt-4 pb-12',
        md: 'pt-6 pb-16',
        lg: 'pt-8 pb-20'
    }

    const alignClasses = {
        left: '',
        center: 'text-center'
    }

    return [
        props.backgroundColor,
        'text-white relative overflow-hidden',
        sizeClasses[props.size],
        alignClasses[props.textAlign]
    ].join(' ')
})

// Классы для оверлея
const overlayClass = computed(() => {
    const overlayClasses = {
        gradient: 'absolute inset-0 bg-gradient-to-r from-cyan-900/70 to-cyan-800/50',
        solid: 'absolute inset-0 bg-cyan-800/60',
        none: ''
    }

    return overlayClasses[props.overlayType]
})

// Классы для заголовка
const titleClass = computed(() => {
    const sizeClasses = {
        sm: 'text-2xl md:text-3xl',
        md: 'text-3xl md:text-4xl',
        lg: 'text-4xl md:text-5xl'
    }

    return [sizeClasses[props.size], 'font-bold mb-4 text-white'].join(' ')
})

// Классы для описания
const descriptionClass = computed(() => {
    const sizeClasses = {
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl'
    }

    const maxWidthClass = props.textAlign === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl'

    return [
        sizeClasses[props.size],
        'text-gray-200',
        maxWidthClass
    ].join(' ')
})
</script>