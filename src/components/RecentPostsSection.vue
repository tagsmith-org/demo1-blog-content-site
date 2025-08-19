<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-fade-in-up">
        <h2 class="text-3xl lg:text-4xl font-bold text-primary mb-4">
          {{ showAllArticles ? 'All Articles' : 'Recent Articles' }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ getDescription() }}
        </p>
      </div>

      <!-- Search Bar -->
      <div class="mb-12 animate-fade-in-up">
        <SearchBar :articles="allArticles" @search="handleSearch" @select-article="handleSelectArticle" />
      </div>

      <!-- Posts Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard v-for="(post, index) in filteredPosts" :key="post.id" :post="post"
          :style="{ animationDelay: `${index * 0.1}s` }" @open-article="$emit('openArticle', $event)" />
      </div>

      <!-- No results message -->
      <div v-if="filteredPosts.length === 0 && searchQuery" class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
        <p class="text-gray-600">Try adjusting your search terms or browse all articles.</p>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12 animate-fade-in-up">
        <button @click="viewAllArticles" class="btn-secondary">
          {{ showAllArticles ? 'Show Recent Articles' : 'View All Articles' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BlogPost } from '../types/blog'
import PostCard from './PostCard.vue'
import SearchBar from './SearchBar.vue'

interface Props {
  posts: BlogPost[]
  allArticles: BlogPost[]
}

interface Emits {
  (e: 'openArticle', post: BlogPost): void
  (e: 'search', query: string): void
  (e: 'selectArticle', article: BlogPost): void
  (e: 'viewAllArticles'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const searchQuery = ref('')
const showAllArticles = ref(false)

// Get posts to display (recent or all)
const displayPosts = computed(() => {
  return showAllArticles.value ? props.allArticles : props.posts
})

// Filtered posts based on search query
const filteredPosts = computed(() => {
  if (!searchQuery.value.trim()) {
    return displayPosts.value
  }

  const query = searchQuery.value.toLowerCase()
  return displayPosts.value.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.excerpt.toLowerCase().includes(query) ||
    post.author.toLowerCase().includes(query) ||
    post.category.toLowerCase().includes(query)
  )
})

function handleSearch(query: string): void {
  searchQuery.value = query
  emit('search', query)
}

function handleSelectArticle(article: BlogPost): void {
  searchQuery.value = ''
  emit('selectArticle', article)
}

function viewAllArticles(): void {
  searchQuery.value = ''
  showAllArticles.value = !showAllArticles.value
  // Emit event to parent to show all articles
  emit('viewAllArticles')
}

function getDescription(): string {
  return showAllArticles.value
    ? 'Browse all our articles, insights, and stories'
    : 'Discover our latest insights, tips, and stories from around the world'
}
</script>
