<template>
    <section :class="sectionClass">
        <div class="container-custom">
            <!-- Заголовок секции -->
            <div v-if="title || description" class="text-center mb-12">
                <AnimatedSection v-if="title" animation="fade-down" tag="h2"
                    class="text-2xl md:text-3xl font-bold mb-4 text-cyan-800">
                    {{ title }}
                </AnimatedSection>

                <AnimatedSection v-if="description" animation="fade-down" :delay="0.1" tag="p"
                    class="text-gray-600 max-w-3xl mx-auto">
                    {{ description }}
                </AnimatedSection>
            </div>

            <!-- Grid элементов -->
            <div :class="gridClass">
                <ValueCard v-for="(item, index) in items" :key="index" :icon="item.icon" :title="item.title"
                    :description="item.description" :size="cardSize" :variant="cardVariant" :animation="cardAnimation"
                    :delay="0.1 + index * 0.1" :decoration-delay="index * 0.5" />
            </div>

            <!-- Дополнительный контент -->
            <div v-if="$slots.footer" class="mt-12 text-center">
                <slot name="footer" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import AnimatedSection from '~/components/core/AnimatedSection.vue'
import ValueCard from '~/components/ui/ValueCard.vue'

interface GridItem {
    icon: string
    title: string
    description: string
}

interface Props {
    title?: string
    description?: string
    items: GridItem[]
    columns?: 1 | 2 | 3 | 4
    backgroundColor?: 'white' | 'gray' | 'transparent'
    cardSize?: 'sm' | 'md' | 'lg'
    cardVariant?: 'default' | 'advantage' | 'feature'
    cardAnimation?: 'fade-up' | 'fade-in' | 'scale-in' | 'bounce-in'
}

const props = withDefaults(defineProps<Props>(), {
    columns: 3,
    backgroundColor: 'gray',
    cardSize: 'md',
    cardVariant: 'default',
    cardAnimation: 'fade-up'
})

// Динамические классы для секции
const sectionClass = computed(() => {
    const bgClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        transparent: ''
    }

    return ['py-12 relative overflow-hidden', bgClasses[props.backgroundColor]]
        .filter(Boolean).join(' ')
})

// Классы для grid
const gridClass = computed(() => {
    const columnClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }

    return [
        'grid',
        columnClasses[props.columns],
        'gap-8'
    ].join(' ')
})
</script>