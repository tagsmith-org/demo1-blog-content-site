<template>
    <div class="min-h-screen bg-background">
        <!-- Header -->
        <header class="bg-gradient-to-r from-secondary to-green-600 text-white py-16">
            <div class="container mx-auto px-4 lg:px-8">
                <div class="flex items-center space-x-4 mb-6">
                    <button @click="$emit('goBack')"
                        class="flex items-center space-x-2 hover:bg-white/10 rounded-lg px-3 py-2 transition-colors duration-200">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7">
                            </path>
                        </svg>
                        <span>Back to Home</span>
                    </button>
                </div>

                <div class="max-w-4xl">
                    <div
                        class="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4">
                        {{ category?.name }}
                    </div>

                    <h1 class="text-4xl lg:text-5xl font-bold mb-4">
                        {{ category?.name }} Articles
                    </h1>

                    <p class="text-xl text-green-100 max-w-2xl">
                        {{ getCategoryDescription(category?.name || '') }}
                    </p>

                    <div class="mt-6 flex items-center space-x-6 text-green-100">
                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                                </path>
                            </svg>
                            <span>{{ filteredPosts.length }} articles</span>
                        </div>

                        <div class="flex items-center space-x-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>{{ totalReadTime }} min read</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Articles List -->
        <main class="py-12">
            <div class="container mx-auto px-4 lg:px-8">
                <!-- Search and Filter -->
                <div class="mb-8">
                    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <div class="relative flex-1 max-w-md">
                            <input v-model="searchQuery" type="text" placeholder="Search articles..."
                                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent" />
                            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>

                        <div class="flex items-center space-x-4">
                            <select v-model="sortBy"
                                class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent">
                                <option value="date">Sort by Date</option>
                                <option value="title">Sort by Title</option>
                                <option value="author">Sort by Author</option>
                                <option value="readTime">Sort by Read Time</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Articles List -->
                <div class="space-y-4">
                    <ArticleRow v-for="post in sortedPosts" :key="post.id" :post="post"
                        @open-article="$emit('openArticle', $event)" />
                </div>

                <!-- Empty State -->
                <div v-if="sortedPosts.length === 0" class="text-center py-16">
                    <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                            </path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                    <p class="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { BlogPost, Category } from '../types/blog'
import ArticleRow from './ArticleRow.vue'

interface Props {
    category: Category | null
    posts: BlogPost[]
}

interface Emits {
    (e: 'goBack'): void
    (e: 'openArticle', post: BlogPost): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Search and filter state
const searchQuery = ref('')
const sortBy = ref('date')

// Filtered and sorted posts
const filteredPosts = computed(() => {
    if (!searchQuery.value) return props.posts

    const query = searchQuery.value.toLowerCase()
    return props.posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query)
    )
})

const sortedPosts = computed(() => {
    const posts = [...filteredPosts.value]

    switch (sortBy.value) {
        case 'title':
            return posts.sort((a, b) => a.title.localeCompare(b.title))
        case 'author':
            return posts.sort((a, b) => a.author.localeCompare(b.author))
        case 'readTime':
            return posts.sort((a, b) => {
                const aTime = parseInt(a.readTime.split(' ')[0])
                const bTime = parseInt(b.readTime.split(' ')[0])
                return aTime - bTime
            })
        case 'date':
        default:
            return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }
})

const totalReadTime = computed(() => {
    return props.posts.reduce((total, post) => {
        const time = parseInt(post.readTime.split(' ')[0])
        return total + time
    }, 0)
})

function getCategoryDescription(categoryName: string): string {
    const descriptions: Record<string, string> = {
        'Technology': 'Explore the latest tech trends, tutorials, and insights that shape our digital world.',
        'Lifestyle': 'Discover personal development tips and life improvement strategies for a better you.',
        'Food': 'Dive into delicious recipes, cooking tips, and culinary adventures from around the world.',
        'Travel': 'Journey through amazing destinations, travel tips, and inspiring stories from globetrotters.',
        'Design': 'Get inspired by UI/UX trends, graphic design tips, and creative inspiration.',
        'Health': 'Learn about wellness, fitness, and mental health advice for a healthier lifestyle.'
    }

    return descriptions[categoryName] || 'Explore our curated content in this category.'
}
</script>
