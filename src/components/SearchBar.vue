<template>
    <div class="relative max-w-2xl mx-auto">
        <div class="relative">
            <input v-model="searchQuery" @input="handleSearch" @keyup.enter="performSearch" @focus="handleFocus"
                type="text" placeholder="Search articles, topics, or authors..."
                class="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-200" />
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </div>
            <button @click="performSearch"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary hover:bg-secondary/90 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                Search
            </button>
        </div>

        <!-- Search suggestions -->
        <div v-if="showSuggestions && filteredSuggestions.length > 0"
            class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
            <div v-for="suggestion in filteredSuggestions" :key="suggestion.id" @click="selectSuggestion(suggestion)"
                class="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                            </path>
                        </svg>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-900">{{ suggestion.title }}</h4>
                        <p class="text-sm text-gray-500">{{ suggestion.category }} • {{ suggestion.author }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { BlogPost } from '../types/blog'

interface Props {
    articles: BlogPost[]
}

interface Emits {
    (e: 'search', query: string): void
    (e: 'selectArticle', article: BlogPost): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const searchQuery = ref('')
const showSuggestions = ref(false)

// Filtered suggestions based on search query
const filteredSuggestions = computed(() => {
    if (!searchQuery.value.trim()) return []

    const query = searchQuery.value.toLowerCase()
    return props.articles.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query)
    ).slice(0, 5) // Limit to 5 suggestions
})

function handleSearch(): void {
  if (searchQuery.value.trim()) {
    showSuggestions.value = true
  } else {
    showSuggestions.value = false
  }
  // Emit search event for filtering
  emit('search', searchQuery.value.trim())
}

function performSearch(): void {
    if (searchQuery.value.trim()) {
        emit('search', searchQuery.value.trim())
        showSuggestions.value = false
    }
}

function selectSuggestion(article: BlogPost): void {
    emit('selectArticle', article)
    searchQuery.value = ''
    showSuggestions.value = false
}

// Show suggestions when input is focused
function handleFocus(): void {
    if (searchQuery.value.trim()) {
        showSuggestions.value = true
    }
}

// Hide suggestions when clicking outside
function handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
        showSuggestions.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
