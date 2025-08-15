<template>
  <section class="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
    <div class="container mx-auto px-4 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="space-y-6 animate-fade-in-up">
          <div
            class="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
            {{ featuredPost.category }}
          </div>

          <h1 class="text-4xl lg:text-6xl font-bold text-primary leading-tight">
            {{ featuredPost.title }}
          </h1>

          <p class="text-lg lg:text-xl text-gray-600 leading-relaxed">
            {{ featuredPost.excerpt }}
          </p>

          <div class="flex items-center space-x-4 text-sm text-gray-500">
            <span>By {{ featuredPost.author }}</span>
            <span>•</span>
            <span>{{ formatDate(featuredPost.date) }}</span>
            <span>•</span>
            <span>{{ featuredPost.readTime }}</span>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <button @click="$emit('openArticle', featuredPost)" class="btn-primary">
              Read Full Article
            </button>
            <button class="btn-secondary">
              Explore More
            </button>
          </div>
        </div>

        <!-- Image -->
        <div class="relative animate-fade-in">
          <div class="relative overflow-hidden rounded-2xl shadow-2xl">
            <img :src="featuredPost.image" :alt="featuredPost.title"
              class="w-full h-80 lg:h-96 object-cover image-hover" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <!-- Floating card -->
          <div class="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 max-w-xs">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
                  </path>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-primary">Featured Article</p>
                <p class="text-xs text-gray-500">Trending this week</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '../types/blog'

interface Props {
  featuredPost: BlogPost
}

interface Emits {
  (e: 'openArticle', post: BlogPost): void
}

defineProps<Props>()
defineEmits<Emits>()

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
