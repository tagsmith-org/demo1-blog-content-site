<template>
    <div class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer group"
        @click="handleCategoryClick">
        <div class="flex items-center space-x-4">
            <!-- Category Icon -->
            <div class="w-12 h-12 rounded-lg flex items-center justify-center"
                :style="{ backgroundColor: category.color + '20', color: category.color }">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                    </path>
                </svg>
            </div>

            <!-- Category Info -->
            <div class="flex-1">
                <h3
                    class="text-lg font-semibold text-primary group-hover:text-secondary transition-colors duration-200">
                    {{ category.name }}
                </h3>
                <p class="text-sm text-gray-500">
                    {{ category.count }} articles
                </p>
            </div>

            <!-- Arrow -->
            <svg class="w-5 h-5 text-gray-400 group-hover:text-secondary transition-colors duration-200" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category } from '../types/blog'

interface Props {
    category: Category
}

interface Emits {
    (e: 'openCategory', category: Category): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function handleCategoryClick(): void {
    emit('openCategory', props.category)
}
</script>
