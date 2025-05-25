<template>
    <div
        class="flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div class="bg-cyan-100 p-3 rounded-lg mr-4 transition-transform duration-300 hover:scale-110">
            <Icon :name="icon" class="h-6 w-6 text-cyan-600" />
        </div>
        <div>
            <h3 class="text-lg font-bold text-cyan-700">{{ title }}</h3>
            <div class="text-gray-700">
                <component :is="linkUrl ? 'a' : 'p'" :href="linkUrl"
                    :class="linkUrl ? 'hover:text-cyan-600 transition-colors duration-200' : ''">
                    {{ mainText }}
                </component>
            </div>
            <p v-if="subText" class="text-gray-600 text-sm mt-1">{{ subText }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    icon: string
    title: string
    mainText: string
    subText?: string
    linkUrl?: string
}

defineProps<Props>()
</script>