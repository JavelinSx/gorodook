<template>
    <section :class="sectionClass">
        <!-- Wave разделитель сверху -->
        <WaveDivider v-if="showTopWave" position="top" :fill-color="topWaveFill" :flip="true" />

        <!-- Контент карты -->
        <div v-if="showContent" class="container-custom">
            <!-- Заголовок -->
            <div v-if="title || description" :class="headerClass">
                <AnimatedSection v-if="title" animation="fade-up" tag="h2" :class="titleClass">
                    {{ title }}
                </AnimatedSection>

                <AnimatedSection v-if="description" animation="fade-up" :delay="0.1" tag="p" :class="descriptionClass">
                    {{ description }}
                </AnimatedSection>
            </div>

            <!-- Карта -->
            <AnimatedSection animation="fade-up" :delay="titleDelay" :class="mapContainerClass">
                <iframe v-if="mapUrl" :src="mapUrl" width="100%" height="100%" frameborder="0" allowfullscreen
                    :title="mapTitle" />

                <!-- Плейсхолдер если нет карты -->
                <div v-else class="w-full h-full flex items-center justify-center text-gray-500">
                    <Icon name="i-heroicons-map" class="h-12 w-12 mr-2" />
                    <span>{{ placeholderText }}</span>
                </div>
            </AnimatedSection>

            <!-- Дополнительная информация -->
            <div v-if="$slots.footer" class="mt-6">
                <AnimatedSection animation="fade-up" :delay="titleDelay + 0.2">
                    <slot name="footer" />
                </AnimatedSection>
            </div>
        </div>

        <!-- Wave разделитель снизу -->
        <WaveDivider v-if="showBottomWave" position="bottom" :fill-color="bottomWaveFill" />
    </section>
</template>

<script setup lang="ts">
import AnimatedSection from '~/components/core/AnimatedSection.vue'
import WaveDivider from '~/components/core/WaveDivider.vue'

interface Props {
    title?: string
    description?: string
    mapUrl?: string
    mapTitle?: string
    height?: string
    showContent?: boolean
    showTopWave?: boolean
    showBottomWave?: boolean
    topWaveFill?: string
    bottomWaveFill?: string
    backgroundColor?: 'white' | 'gray' | 'transparent'
    placeholderText?: string
    headerAlign?: 'left' | 'center'
    rounded?: boolean
    shadow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    mapTitle: 'Карта расположения',
    height: '96', // h-96 = 384px
    showContent: true,
    showTopWave: false,
    showBottomWave: false,
    topWaveFill: 'white',
    bottomWaveFill: 'white',
    backgroundColor: 'transparent',
    placeholderText: 'Карта будет добавлена позже',
    headerAlign: 'center',
    rounded: true,
    shadow: true
})

// Задержка для анимации заголовка
const titleDelay = computed(() => {
    return (props.title || props.description) ? 0.2 : 0.1
})

// Классы для секции
const sectionClass = computed(() => {
    const bgClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        transparent: ''
    }

    return [
        'py-8 relative overflow-hidden',
        bgClasses[props.backgroundColor]
    ].filter(Boolean).join(' ')
})

// Классы для заголовка
const headerClass = computed(() => {
    const alignClasses = {
        left: 'mb-6',
        center: 'text-center mb-6'
    }

    return alignClasses[props.headerAlign]
})

const titleClass = computed(() => {
    return 'text-2xl md:text-3xl font-bold text-cyan-800 mb-4'
})

const descriptionClass = computed(() => {
    const maxWidthClass = props.headerAlign === 'center' ? 'max-w-3xl mx-auto' : 'max-w-3xl'
    return ['text-gray-600', maxWidthClass].join(' ')
})

// Классы для контейнера карты
const mapContainerClass = computed(() => {
    const baseClasses = [`h-${props.height}`, 'bg-gray-100', 'overflow-hidden']

    if (props.rounded) {
        baseClasses.push('rounded-lg')
    }

    if (props.shadow) {
        baseClasses.push('shadow-md hover:shadow-lg transition-shadow duration-300')
    }

    return baseClasses.join(' ')
})
</script>