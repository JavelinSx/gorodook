<template>
    <div class="contacts-page">
        <!-- Page Header -->
        <PageHeaderWidget 
            title="Контакты"
            description="Свяжитесь с нами, чтобы забронировать квартиру или получить дополнительную информацию."
            size="md"
            show-wave />

        <!-- Contact Information -->
        <ContactWidget 
            title="Наши контакты"
            form-title="Оставьте заявку"
            :selected-apartment="selectedApartment"
            :show-social="true"
            social-title="Мы в социальных сетях"
            background-color="gray" />

        <!-- Map Section -->
        <MapWidget 
            title="Наш офис на карте" 
            description="Мы находимся в центре города Мирный"
            :map-url="contactData.maps.office"
            :show-content="true"
            background-color="white"
            height="96" />
    </div>
</template>

<script setup lang="ts">
import { useApartmentStore } from '~/store/apartmentStore'
import { contactData } from '~/config/contact'

// Components  
import PageHeaderWidget from '~/components/widgets/PageHeaderWidget.vue'
import ContactWidget from '~/components/widgets/ContactWidget.vue'
import MapWidget from '~/components/widgets/MapWidget.vue'

// Set metadata for this page
useHead({
    title: 'Контакты | Городок',
    meta: [
        {
            name: 'description',
            content: 'Свяжитесь с нами, чтобы забронировать квартиру или получить дополнительную информацию об аренде квартир в городе Мирный.'
        }
    ],
})

// Get route query parameters
const route = useRoute()
const apartmentId = route.query.apartmentId as string | undefined

// Get store and apartment details if ID provided
const apartmentStore = useApartmentStore()
const selectedApartment = computed(() => {
    if (apartmentId) {
        return apartmentStore.getApartmentById(apartmentId)
    }
    return null
})

// Initialize scroll animations
const { initializeScrollAnimations } = useScrollAnimations()

onMounted(() => {
    const cleanup = initializeScrollAnimations()

    onBeforeUnmount(() => {
        cleanup()
    })
})
</script>