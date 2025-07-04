<template>
    <section :class="sectionClass">

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
    backgroundColor: 'bg-cyan-800',
    size: 'md',
    titleTag: 'h1',
    showWave: true,
    waveFillColor: 'gray-50',
    waveHeight: '50px',
    overlayType: 'gradient',
    textAlign: 'left'
})


// Классы для секции
const sectionClass = computed(() => {
    const sizeClasses = {
        sm: 'pt-4 pb-12',
        md: 'pt-20 pb-16',
        lg: 'pt-20 pb-20'
    }

    const alignClasses = {
        left: '',
        center: 'text-center'
    }

    return [
        props.backgroundColor,
        'text-white relative overflow-hidden mb-[-1px]',
        sizeClasses[props.size],
        alignClasses[props.textAlign]
    ].join(' ')
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