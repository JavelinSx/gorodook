<!-- components/ApartmentCardSkeleton.vue -->
<template>
    <div class="apartment-card card animate-pulse bg-white rounded-lg shadow-sm overflow-hidden">
        <!-- Image skeleton -->
        <div class="h-56 bg-gray-300 rounded-t-lg relative">
            <!-- Room badge skeleton -->
            <div class="absolute top-4 left-4 w-24 h-7 bg-gray-400 rounded-md" />
        </div>

        <!-- Content skeleton -->
        <div class="p-4">
            <!-- Title skeleton -->
            <div class="h-6 bg-gray-300 rounded mb-2" />
            <!-- Description skeleton -->
            <div class="space-y-2 mb-4">
                <div class="h-4 bg-gray-200 rounded" />
                <div class="h-4 bg-gray-200 rounded w-5/6" />
            </div>

            <!-- Features skeleton -->
            <div class="grid grid-cols-2 gap-2 mb-4">
                <div class="h-5 bg-gray-200 rounded" />
                <div class="h-5 bg-gray-200 rounded" />
                <div class="h-5 bg-gray-200 rounded" />
                <div class="h-5 bg-gray-200 rounded" />
            </div>

            <!-- Button skeleton -->
            <div class="h-10 bg-gray-300 rounded" />
        </div>
    </div>
</template>

<style scoped>
@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>