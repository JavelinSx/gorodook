<template>
    <section :class="sectionClass">
        <div class="container-custom">
            <div :class="gridClass">
                <!-- Текстовый контент -->
                <div :class="textContentClass">
                    <AnimatedSection animation="fade-in" tag="h2"
                        class="text-2xl md:text-3xl font-bold mb-6 text-cyan-800">
                        {{ title }}
                    </AnimatedSection>

                    <!-- Параграфы -->
                    <AnimatedSection v-for="(paragraph, index) in paragraphs" :key="index" animation="fade-in"
                        :delay="0.1 + index * 0.1" tag="p" class="text-gray-700 mb-4">
                        {{ paragraph }}
                    </AnimatedSection>

                    <!-- Статистика -->
                    <div v-if="stats && stats.length" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <StatCard v-for="(stat, index) in stats" :key="index" :value="stat.value" :label="stat.label"
                            :delay="0.4 + index * 0.1" animation="fade-up" />
                    </div>

                    <!-- Дополнительный контент -->
                    <slot name="extra-content" />
                </div>

                <!-- Изображение -->
                <AnimatedSection v-if="imageUrl" :animation="imageAnimation" class="relative">
                    <div class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-lg">
                        <img :src="imageUrl" :alt="imageAlt"
                            class="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110">
                    </div>

                    <!-- Декоративные элементы -->
                    <div v-if="showDecorations"
                        class="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-100 rounded-lg -z-10" />
                    <div v-if="showDecorations"
                        class="absolute -top-6 -right-6 w-32 h-32 bg-cyan-100 rounded-lg -z-10" />
                </AnimatedSection>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import AnimatedSection from '~/components/core/AnimatedSection.vue'
import StatCard from '~/components/ui/StatCard.vue'

interface Stat {
    value: string
    label: string
}

interface Props {
    title: string
    paragraphs: string[]
    stats?: Stat[]
    imageUrl?: string
    imageAlt?: string
    layout?: 'text-only' | 'text-image' | 'image-text'
    backgroundColor?: 'white' | 'gray' | 'transparent'
    imageAnimation?: 'slide-in-right' | 'slide-in-left' | 'fade-in' | 'scale-in'
    showDecorations?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    layout: 'text-image',
    backgroundColor: 'transparent',
    imageAnimation: 'slide-in-right',
    showDecorations: true,
    imageAlt: 'Изображение'
})

// Динамические классы для секции
const sectionClass = computed(() => {
    const bgClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        transparent: ''
    }

    return ['py-12 relative', bgClasses[props.backgroundColor]].filter(Boolean).join(' ')
})

// Классы для сетки
const gridClass = computed(() => {
    if (props.layout === 'text-only') {
        return 'max-w-4xl mx-auto'
    }

    const orderClass = props.layout === 'image-text' ? 'lg:grid-cols-2' : 'lg:grid-cols-2'
    return `grid grid-cols-1 ${orderClass} gap-12 items-center`
})

// Классы для текстового контента
const textContentClass = computed(() => {
    if (props.layout === 'image-text') {
        return 'lg:order-2'
    }
    return ''
})
</script>