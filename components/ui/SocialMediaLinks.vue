<template>
    <div>
        <AnimatedSection animation="fade-up" tag="h3" class="text-xl font-bold mb-4 text-cyan-800">
            {{ title }}
        </AnimatedSection>

        <AnimatedSection animation="fade-up" :delay="0.1" class="flex space-x-4 mb-8">
            <a v-for="(social, index) in socialLinks" :key="index" :href="social.url" target="_blank"
                rel="noopener noreferrer" :aria-label="social.label"
                class="bg-cyan-100 w-12 h-12 flex items-center justify-center rounded-full hover:bg-cyan-200 transition-all duration-300 hover:shadow-md transform hover:scale-110">
                <Icon :name="social.icon" :class="social.iconClass" />
            </a>
        </AnimatedSection>
    </div>
</template>

<script setup lang="ts">
import { contactData } from '~/config/contact'
import AnimatedSection from '../core/AnimatedSection.vue'
interface SocialLink {
    icon: string
    iconClass: string
    url: string
    label: string
}

interface Props {
    title?: string
    customLinks?: SocialLink[]
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Мы в социальных сетях'
})

// Социальные сети из конфигурации
const defaultLinks: SocialLink[] = [
    {
        icon: 'i-mdi-whatsapp',
        iconClass: 'h-8 w-8 text-cyan-600',
        url: contactData.social.whatsapp,
        label: 'Написать в WhatsApp'
    },
    {
        icon: 'i-mdi-telegram',
        iconClass: 'h-6 w-6 text-cyan-600',
        url: contactData.social.telegram,
        label: 'Написать в Telegram'
    },
    {
        icon: 'i-mdi-vk',
        iconClass: 'h-6 w-6 text-cyan-600',
        url: contactData.social.vk,
        label: 'Перейти в VK'
    }
]

const socialLinks = computed(() => props.customLinks || defaultLinks)
</script>