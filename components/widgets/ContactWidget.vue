<template>
    <section :class="sectionClass">
        <div class="container-custom">
            <div :class="gridClass">
                <!-- Контактная информация -->
                <AnimatedSection animation="slide-in-left" class="space-y-6">
                    <!-- Социальные сети -->
                    <SocialMediaLinks v-if="showSocial" :title="socialTitle" :custom-links="customSocialLinks" />

                    <!-- Основная контактная информация -->
                    <div>
                        <AnimatedSection animation="fade-up" tag="h2" class="text-2xl font-bold mb-6 text-cyan-800">
                            {{ title }}
                        </AnimatedSection>

                        <div class="space-y-6 mb-8">
                            <AnimatedSection v-for="(contact, index) in contactInfo" :key="index" animation="fade-up"
                                :delay="0.1 + index * 0.1">
                                <ContactInfoCard v-bind="contact" />
                            </AnimatedSection>
                        </div>

                        <!-- Дополнительная информация -->
                        <div v-if="$slots.additional" class="mt-6">
                            <AnimatedSection animation="fade-up" :delay="additionalDelay">
                                <slot name="additional" />
                            </AnimatedSection>
                        </div>
                    </div>
                </AnimatedSection>

                <!-- Правая колонка (форма или дополнительный контент) -->
                <AnimatedSection animation="slide-in-right" :class="rightColumnClass">
                    <slot name="main">
                        <!-- Форма по умолчанию -->
                        <h2 class="text-2xl font-bold mb-6 text-cyan-800">{{ formTitle }}</h2>
                        <BookingForm :apartment="selectedApartment" />
                    </slot>
                </AnimatedSection>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import AnimatedSection from '~/components/core/AnimatedSection.vue'
import SocialMediaLinks from '~/components/ui/SocialMediaLinks.vue'
import ContactInfoCard from '~/components/ui/ContactInfoCard.vue'
import BookingForm from '~/components/forms/BookingForm.vue'
import { contactData, getPhoneLink, getEmailLink } from '~/config/contact'
import type { Apartment } from '~/store/apartmentStore'

interface ContactInfo {
    icon: string
    title: string
    mainText: string
    subText?: string
    linkUrl?: string
}

interface SocialLink {
    icon: string
    iconClass: string
    url: string
    label: string
}

interface Props {
    title?: string
    formTitle?: string
    selectedApartment?: Apartment | null
    showSocial?: boolean
    socialTitle?: string
    customContactInfo?: ContactInfo[]
    customSocialLinks?: SocialLink[]
    backgroundColor?: 'white' | 'gray' | 'transparent'
    layout?: 'two-column' | 'single-column'
    showForm?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Наши контакты',
    formTitle: 'Оставьте заявку',
    showSocial: true,
    socialTitle: 'Мы в социальных сетях',
    backgroundColor: 'gray',
    layout: 'two-column',
    showForm: true
})

// Задержка для дополнительного контента
const additionalDelay = computed(() => {
    return props.customContactInfo ?
        0.1 + props.customContactInfo.length * 0.1 + 0.1 :
        0.4
})

// Контактная информация
const contactInfo = computed(() => {
    if (props.customContactInfo) {
        return props.customContactInfo
    }

    return [
        {
            icon: 'i-heroicons-map-pin',
            title: 'Адрес',
            mainText: contactData.address,
            subText: `Офис работает ${contactData.workingHours.office}`
        },
        {
            icon: 'i-heroicons-phone',
            title: 'Телефон',
            mainText: contactData.phone,
            subText: `Звонки принимаются ${contactData.workingHours.phone}`,
            linkUrl: getPhoneLink()
        },
        {
            icon: 'i-heroicons-envelope',
            title: 'Email',
            mainText: contactData.email,
            subText: 'Мы отвечаем на письма в течение 24 часов',
            linkUrl: getEmailLink()
        }
    ]
})

// Классы для секции
const sectionClass = computed(() => {
    const bgClasses = {
        white: 'bg-white',
        gray: 'bg-gray-50',
        transparent: ''
    }

    return [
        'py-12 relative',
        bgClasses[props.backgroundColor]
    ].filter(Boolean).join(' ')
})

// Классы для сетки
const gridClass = computed(() => {
    if (props.layout === 'single-column') {
        return 'max-w-4xl mx-auto space-y-8'
    }

    return 'grid grid-cols-1 lg:grid-cols-2 gap-8'
})

// Классы для правой колонки
const rightColumnClass = computed(() => {
    if (props.layout === 'single-column') {
        return 'bg-white rounded-lg shadow-md p-6'
    }

    if (!props.showForm) {
        return ''
    }

    return 'bg-white rounded-lg shadow-md p-6'
})
</script>