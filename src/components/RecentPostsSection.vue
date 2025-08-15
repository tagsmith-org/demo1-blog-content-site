<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16 animate-fade-in-up">
        <h2 class="text-3xl lg:text-4xl font-bold text-primary mb-4">
          Recent Articles
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our latest insights, tips, and stories from around the world
        </p>
      </div>

      <!-- Posts Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PostCard v-for="(post, index) in posts" :key="post.id" :post="post"
          :style="{ animationDelay: `${index * 0.1}s` }" @open-article="$emit('openArticle', $event)" />
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12 animate-fade-in-up">
        <button class="btn-secondary">
          View All Articles
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '../types/blog'
import PostCard from './PostCard.vue'

interface Props {
  posts: BlogPost[]
}

interface Emits {
  (e: 'openArticle', post: BlogPost): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
