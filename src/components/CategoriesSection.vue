<template>
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4 lg:px-8">
            <!-- Section Header -->
            <div class="text-center mb-16 animate-fade-in-up">
                <h2 class="text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Explore Categories
                </h2>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    Find content that interests you most across our diverse topics
                </p>
            </div>

            <!-- Categories Grid -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <CategoryCard v-for="(category, index) in categories" :key="category.id" :category="category"
                    :style="{ animationDelay: `${index * 0.1}s` }" @open-category="$emit('openCategory', $event)" />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { Category } from '../types/blog'
import CategoryCard from './CategoryCard.vue'

interface Props {
    categories: Category[]
}

interface Emits {
    (e: 'openCategory', category: Category): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>
