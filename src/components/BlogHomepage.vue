<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center space-x-4">
            <button @click="goToHome"
              class="text-2xl font-bold text-primary hover:text-secondary transition-colors duration-200">
              BlogHub
            </button>
          </div>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <button @click="goToHome" class="text-gray-600 hover:text-primary transition-colors duration-200">
              Home
            </button>
          </nav>

          <!-- User Menu -->
          <UserMenu @open-auth="openAuthModal" @open-profile="openProfile" @open-my-articles="openMyArticles"
            @open-write-article="openWriteArticle" />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div v-if="currentPage === 'home'">
      <HeroSection :featured-post="featuredPost" @open-article="openArticleModal" />
      <RecentPostsSection :posts="recentPosts" @open-article="openArticleModal" />
      <CategoriesSection :categories="categories" @open-category="openCategoryPage" />
      <NewsletterSection />
      <FooterSection />
    </div>

    <!-- Category Page -->
    <div v-else-if="currentPage === 'category'">
      <CategoryPage :category="selectedCategory" :posts="categoryPosts" @go-back="goToHome"
        @open-article="openArticleModal" />
    </div>

    <!-- Article Modal -->
    <ArticleModal :is-open="isModalOpen" :article="selectedArticle" @close="closeArticleModal" />

    <!-- Auth Modal -->
    <AuthModal :is-open="isAuthModalOpen" @close="closeAuthModal" @success="handleAuthSuccess" />

    <!-- Profile Modal -->
    <ProfileModal :is-open="isProfileModalOpen" @close="closeProfileModal" />
    <!-- My Articles Modal -->
    <MyArticlesModal :is-open="isMyArticlesModalOpen" @close="closeMyArticlesModal"
      @open-write-article="openWriteArticle" @edit-article="openEditArticleModal" @open-comments="openCommentsModal" />
    <!-- Write Article Modal -->
    <WriteArticleModal :is-open="isWriteArticleModalOpen" @close="closeWriteArticleModal" />
    <!-- Edit Article Modal -->
    <EditArticleModal :is-open="isEditArticleModalOpen" :article="articleToEdit" @close="closeEditArticleModal" />
    <!-- Comments Modal -->
    <CommentsModal :is-open="isCommentsModalOpen" :article="articleForComments" @close="closeCommentsModal" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { categories } from '../data/blog-data'
import type { BlogPost, Category } from '../types/blog'
import { useAuthStore } from '../stores/auth'
import { useArticlesStore } from '../stores/articles'
import HeroSection from './HeroSection.vue'
import RecentPostsSection from './RecentPostsSection.vue'
import CategoriesSection from './CategoriesSection.vue'
import NewsletterSection from './NewsletterSection.vue'
import FooterSection from './FooterSection.vue'
import ArticleModal from './ArticleModal.vue'
import CategoryPage from './CategoryPage.vue'
import UserMenu from './UserMenu.vue'
import AuthModal from './AuthModal.vue'
import ProfileModal from './ProfileModal.vue'
import MyArticlesModal from './MyArticlesModal.vue'
import WriteArticleModal from './WriteArticleModal.vue'
import EditArticleModal from './EditArticleModal.vue'
import { watch } from 'vue'
import CommentsModal from './CommentsModal.vue'
import { useCommentsStore } from '../stores/comments'
import { useModalStore } from '../stores/modal'

const authStore = useAuthStore()
const articlesStore = useArticlesStore()
const commentsStore = useCommentsStore()
const modalStore = useModalStore()

// Обновляем computed для использования articles store
const featuredPost = computed<BlogPost>(() => {
  const allArticles = articlesStore.allArticles
  return allArticles.find(post => post.featured) || allArticles[0]
})

const recentPosts = computed<BlogPost[]>(() => {
  const allArticles = articlesStore.allArticles
  return allArticles.filter(post => !post.featured).slice(0, 6)
})

// Page state
const currentPage = ref<'home' | 'category'>('home')
const selectedCategory = ref<Category | null>(null)

// Modal state
const isModalOpen = computed(() => modalStore.isModalOpen('article'))
const selectedArticle = ref<BlogPost | null>(null)

// Auth modal state
const isAuthModalOpen = computed(() => modalStore.isModalOpen('auth'))

// Add new modal states
const isProfileModalOpen = computed(() => modalStore.isModalOpen('profile'))
const isMyArticlesModalOpen = computed(() => modalStore.isModalOpen('myArticles'))
const isWriteArticleModalOpen = computed(() => modalStore.isModalOpen('writeArticle'))

// Добавить состояние для EditArticleModal
const isEditArticleModalOpen = computed(() => modalStore.isModalOpen('editArticle'))
const articleToEdit = ref<BlogPost | null>(null)

// Добавить состояние для CommentsModal
const isCommentsModalOpen = computed(() => modalStore.isModalOpen('comments'))
const articleForComments = ref<BlogPost | null>(null)

// Computed

// Category posts
const categoryPosts = computed(() => {
  if (!selectedCategory.value) return []
  return articlesStore.allArticles.filter(post => post.category === selectedCategory.value?.name)
})

// My articles
const myArticles = computed(() => {
  const currentUser = authStore.currentUser
  console.log('Current user in MyArticlesModal:', currentUser)

  if (!currentUser || currentUser.isGuest) {
    console.log('User is guest or not authenticated')
    return []
  }

  const userArticles = articlesStore.getUserArticles(currentUser.id)
  console.log('User articles for', currentUser.id, ':', userArticles)
  return userArticles
})

// Page navigation functions
function openCategoryPage(category: Category): void {
  selectedCategory.value = category
  currentPage.value = 'category'
  // Scroll to top when navigating to category page
  window.scrollTo(0, 0)
}

function goToHome(): void {
  currentPage.value = 'home'
  selectedCategory.value = null
  // Scroll to top when returning home
  window.scrollTo(0, 0)
}

// Modal functions
function openArticleModal(post: BlogPost): void {
  selectedArticle.value = post
  modalStore.openModal('article')
}

function closeArticleModal(): void {
  modalStore.closeModal('article')
  selectedArticle.value = null
}

// Auth functions
function openAuthModal(): void {
  modalStore.openModal('auth')
}

function closeAuthModal(): void {
  modalStore.closeModal('auth')
}

function handleAuthSuccess(): void {
  closeAuthModal()
}

function openProfile(): void {
  modalStore.openModal('profile')
}

function closeProfileModal(): void {
  modalStore.closeModal('profile')
}

function openMyArticles(): void {
  modalStore.openModal('myArticles')
}

function closeMyArticlesModal(): void {
  modalStore.closeModal('myArticles')
}

function openWriteArticle(): void {
  modalStore.openModal('writeArticle')
}

function closeWriteArticleModal(): void {
  modalStore.closeModal('writeArticle')
}

// Добавить функции для редактирования
function openEditArticleModal(article: BlogPost): void {
  articleToEdit.value = article
  modalStore.openModal('editArticle')
}

function closeEditArticleModal(): void {
  modalStore.closeModal('editArticle')
  articleToEdit.value = null
}

// Добавить функции для работы с комментариями
function openCommentsModal(article: BlogPost): void {
  articleForComments.value = article
  modalStore.openModal('comments')
}

function closeCommentsModal(): void {
  modalStore.closeModal('comments')
  articleForComments.value = null
}


// Initialize stores on mount
onMounted(() => {
  authStore.loadUser()
  articlesStore.loadUserArticles()
  commentsStore.loadComments()

  // Debug info
  console.log('Auth store initialized:', authStore.currentUser)
  console.log('Articles store initialized:', articlesStore.allArticles)
  console.log('Comments store initialized:', commentsStore.comments)

  // Handle escape key
  document.addEventListener('keydown', handleKeydown)
})

// Watch for changes in user articles
watch(() => articlesStore.allArticles, (newArticles) => {
  console.log('Articles store updated:', newArticles)
}, { deep: true })

watch(() => myArticles.value, (newMyArticles) => {
  console.log('My articles updated:', newMyArticles)
}, { deep: true })

// Restore scroll on unmount
onUnmounted(() => {
  document.body.style.overflow = 'auto'
  document.removeEventListener('keydown', handleKeydown)
})

// Handle escape key
function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    modalStore.closeTopModal()
  }
}
</script>
