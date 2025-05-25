<template>
    <section :class="sectionClass">
        <!-- Фоновые градиенты -->
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-700 to-cyan-600" />

        <div class="container-custom text-center relative z-10">
            <!-- Основной контент -->
            <AnimatedSection animation="fade-in" tag="h2" :class="titleClass">
                {{ config.title }}
            </AnimatedSection>

            <AnimatedSection animation="fade-in" :delay="0.1" tag="p" :class="descriptionClass">
                {{ config.description }}
            </AnimatedSection>

            <!-- Дополнительная информация (для контактных CTA) -->
            <div v-if="contactMethods && contactMethods.length" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <AnimatedSection v-for="(contact, index) in contactMethods" :key="index" animation="fade-up"
                    :delay="0.2 + index * 0.1" class="text-center">
                    <Icon :name="contact.icon" class="h-8 w-8 mx-auto mb-3" />
                    <h3 class="font-bold text-lg mb-2">{{ contact.title }}</h3>
                    <a :href="contact.link" :target="contact.external ? '_blank' : '_self'"
                        class="text-cyan-200 hover:text-white transition-colors">
                        {{ contact.text }}
                    </a>
                </AnimatedSection>
            </div>

            <!-- Кнопки действий -->
            <AnimatedSection animation="fade-in" :delay="buttonsDelay" class="flex flex-wrap justify-center gap-4">
                <NuxtLink v-for="(button, index) in config.buttons" :key="index" :to="button.to"
                    :class="getButtonClasses(button.variant)">
                    {{ button.text }}
                </NuxtLink>
            </AnimatedSection>
        </div>

        <!-- Декоративные элементы -->
        <div v-if="showDecorations"
            class="absolute top-10 left-1/4 w-32 h-32 bg-cyan-400 rounded-full opacity-20 animate-pulse"
            style="animation-duration: 6s;" />
        <div v-if="showDecorations"
            class="absolute bottom-10 right-1/4 w-40 h-40 bg-cyan-400 rounded-full opacity-20 animate-pulse"
            style="animation-duration: 8s;" />
    </section>
</template>

<script setup lang="ts">
import AnimatedSection from '~/components/core/AnimatedSection.vue'
import { ctaConfigs, getButtonClasses, type CTAConfig } from '~/config/cta'

interface ContactMethod {
    icon: string
    title: string
    text: string
    link: string
    external: boolean
}

interface Props {
    variant?: keyof typeof ctaConfigs
    customConfig?: CTAConfig
    contactMethods?: ContactMethod[]
    showDecorations?: boolean
    backgroundColor?: string
    size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'about',
    showDecorations: true,
    backgroundColor: 'bg-cyan-600',
    size: 'md'
})

// Получаем конфигурацию
const config = computed(() => {
    if (props.customConfig) {
        return props.customConfig
    }
    return ctaConfigs[props.variant]
})

// Задержка для кнопок
const buttonsDelay = computed(() => {
    return props.contactMethods && props.contactMethods.length ? 0.5 : 0.2
})

// Динамические классы
const sectionClass = computed(() => {
    const sizes = {
        sm: 'py-12',
        md: 'py-16',
        lg: 'py-20'
    }

    return [
        sizes[props.size],
        props.backgroundColor,
        'text-white relative overflow-hidden'
    ].join(' ')
})

const titleClass = computed(() => {
    const sizes = {
        sm: 'text-2xl md:text-3xl',
        md: 'text-3xl md:text-4xl',
        lg: 'text-4xl md:text-5xl'
    }

    return [sizes[props.size], 'font-bold mb-6 text-white'].join(' ')
})

const descriptionClass = computed(() => {
    const sizes = {
        sm: 'text-base md:text-lg',
        md: 'text-lg md:text-xl',
        lg: 'text-xl md:text-2xl'
    }

    return [
        sizes[props.size],
        'mb-8 max-w-3xl mx-auto text-white/90'
    ].join(' ')
})
</script>