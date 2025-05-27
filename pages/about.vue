<template>
    <div class="overflow-hidden">
        <!-- Page Header -->
        <PageHeaderWidget title="О компании Городок"
            description="Снимать квартиры в Мирном без посредников с 2015 года. Узнайте, почему наши клиенты выбирают именно наши квартиры посуточно."
            size="md" show-wave />

        <!-- История компании -->
        <ContentSection title="Мы создаем комфорт" :paragraphs="companyStory" :stats="companyStats"
            image-url="/img/about-us.png" background-color="gray" image-alt="О нашей компании" layout="text-image" />

        <!-- Наши ценности -->
        <ValuesGridSection title="Наши ценности" description="Принципы, которыми мы руководствуемся в работе"
            :items="companyValues" :columns="3" background-color="gray" />

        <!-- CTA Section -->
        <CTASection variant="about" show-decorations />
    </div>
</template>

<script setup lang="ts">
// Components
import PageHeaderWidget from '~/components/widgets/PageHeaderWidget.vue'
import ContentSection from '~/components/sections/ContentSection.vue'
import ValuesGridSection from '~/components/sections/ValuesGridSection.vue'
import CTASection from '~/components/sections/CTASection.vue'

// Set metadata for this page
useHead({
    title: 'О нас | Снимать квартиры в Мирном без посредников с 2015 года',
    meta: [
        {
            name: 'description',
            content: 'Компания "Городок" предлагает снять квартиру в Мирном посуточно без посредников. Узнайте больше о нашей компании и почему клиенты выбирают наши квартиры на сутки.'
        }
    ],
})


// Данные компании
const companyStory = [
    'Компания "Городок" специализируется на предоставлении в аренду комфортабельных квартир в городе Мирный. Мы начали свою деятельность в 2015 году и за это время заработали репутацию надежного партнера как среди местных жителей, так и среди гостей города.',
    'Наша миссия — обеспечить гостей города комфортным временным жильем, которое по уровню удобств не уступает родному дому. Мы тщательно подбираем и обустраиваем каждую квартиру, уделяя внимание каждой детали.',
    'Команда "Городка" состоит из профессионалов, которые знают, как сделать ваше пребывание в Мирном максимально комфортным. Мы всегда на связи и готовы помочь с любыми вопросами по проживанию.'
]

const companyStats = [
    { value: '8+', label: 'лет на рынке' },
    { value: '15+', label: 'квартир в управлении' },
    { value: '1000+', label: 'довольных клиентов' },
    { value: '4.9', label: 'средний рейтинг' }
]

const companyValues = [
    {
        icon: 'i-heroicons-heart',
        title: 'Комфорт',
        description: 'Мы уделяем особое внимание комфорту наших гостей, обеспечивая квартиры всем необходимым для приятного проживания.'
    },
    {
        icon: 'i-heroicons-shield-check',
        title: 'Надежность',
        description: 'Мы ценим доверие наших клиентов и всегда выполняем свои обязательства, обеспечивая надежный сервис.'
    },
    {
        icon: 'i-heroicons-star',
        title: 'Качество',
        description: 'Мы постоянно работаем над повышением качества наших услуг, чтобы предоставлять сервис высокого уровня.'
    }
]

// Use IntersectionObserver for scroll animations
const { initializeScrollAnimations } = useScrollAnimations()

onMounted(() => {
    const cleanup = initializeScrollAnimations()

    onBeforeUnmount(() => {
        cleanup()
    })
})
</script>