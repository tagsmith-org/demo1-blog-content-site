<template>
    <Transition name="modal" appear>
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

            <!-- Modal Container -->
            <div class="relative min-h-screen flex items-center justify-center p-4">
                <div class="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
                    @click.stop>
                    <!-- Close Button -->
                    <button @click="closeModal"
                        class="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                        <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    <!-- Content -->
                    <div class="p-8">
                        <!-- Header -->
                        <div class="flex justify-between items-center mb-8">
                            <div>
                                <h2 class="text-3xl font-bold text-primary mb-2">My Articles</h2>
                                <p class="text-gray-600">Manage your published articles</p>
                            </div>
                            <button @click="openWriteArticle" class="btn-primary">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v16m8-8H4"></path>
                                </svg>
                                Write New Article
                            </button>
                        </div>

                        <!-- Stats -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div class="bg-blue-50 p-6 rounded-xl">
                                <div class="flex items-center">
                                    <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                                            </path>
                                        </svg>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-blue-600">Total Articles</p>
                                        <p class="text-2xl font-bold text-blue-900">{{ myArticles.length }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-green-50 p-6 rounded-xl">
                                <div class="flex items-center">
                                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-green-600">Published</p>
                                        <p class="text-2xl font-bold text-green-900">{{ publishedCount }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-yellow-50 p-6 rounded-xl">
                                <div class="flex items-center">
                                    <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-4">
                                        <p class="text-sm font-medium text-yellow-600">Drafts</p>
                                        <p class="text-2xl font-bold text-yellow-900">{{ draftCount }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Articles List -->
                        <div v-if="myArticles.length > 0" class="space-y-4">
                            <div v-for="article in myArticles" :key="article.id"
                                class="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                                <div class="flex items-start space-x-4">
                                    <!-- Article Image -->
                                    <div class="flex-shrink-0">
                                        <img :src="article.image" :alt="article.title"
                                            class="w-20 h-20 object-cover rounded-lg" />
                                    </div>

                                    <!-- Article Content -->
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-start justify-between">
                                            <div class="flex-1">
                                                <h3 class="text-lg font-semibold text-primary mb-2">{{ article.title }}
                                                </h3>
                                                <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ article.excerpt }}
                                                </p>

                                                <div class="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                                    <span>{{ formatDate(article.date) }}</span>
                                                    <span>•</span>
                                                    <span>{{ article.readTime }}</span>
                                                    <span>•</span>
                                                    <span class="capitalize">{{ article.category }}</span>
                                                </div>

                                                <!-- Status Badge and Comments -->
                                                <div class="flex items-center justify-between">
                                                    <div class="flex items-center space-x-2">
                                                        <span v-if="article.isPublished"
                                                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor"
                                                                viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                                                </path>
                                                            </svg>
                                                            Published
                                                        </span>
                                                        <span v-else
                                                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor"
                                                                viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z">
                                                                </path>
                                                            </svg>
                                                            Draft
                                                        </span>
                                                    </div>

                                                    <!-- Comments Count (only for published articles) -->
                                                    <div v-if="article.isPublished" class="flex items-center space-x-2">
                                                        <span class="text-sm text-gray-500">
                                                            {{ getCommentsCount(article.id) }}/{{
                                                                getNewCommentsCount(article.id) }} comments
                                                        </span>
                                                        <button @click="openComments(article)"
                                                            class="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                            title="View Comments">
                                                            <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                                viewBox="0 0 24 24">
                                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                                    stroke-width="2"
                                                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                                                </path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Actions -->
                                            <div class="flex items-center space-x-2">
                                                <!-- Publish Draft Button (only for drafts) -->
                                                <button v-if="!article.isPublished" @click="publishDraft(article)"
                                                    class="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                    title="Publish Draft">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                </button>

                                                <!-- Edit Button (only for drafts) -->
                                                <button v-if="!article.isPublished" @click="editArticle(article)"
                                                    class="p-2 text-gray-400 hover:text-secondary hover:bg-gray-50 rounded-lg transition-colors"
                                                    title="Edit Article">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                                                        </path>
                                                    </svg>
                                                </button>

                                                <!-- View Button (for published articles) -->
                                                <button v-if="article.isPublished" @click="viewArticle(article)"
                                                    class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Article">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                                                        </path>
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                                        </path>
                                                    </svg>
                                                </button>

                                                <!-- Delete Button (only for drafts) -->
                                                <button v-if="!article.isPublished" @click="deleteArticle(article.id)"
                                                    class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete Article">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Empty State -->
                        <div v-else class="text-center py-12">
                            <div
                                class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
                                    </path>
                                </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
                            <p class="text-gray-600 mb-6">Start writing your first article to see it here</p>
                            <button @click="openWriteArticle" class="btn-primary">
                                Write Your First Article
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useArticlesStore } from '../stores/articles'
import { useCommentsStore } from '../stores/comments'
import type { BlogPost } from '../types/blog'

interface Props {
    isOpen: boolean
}

interface Emits {
    (e: 'close'): void
    (e: 'open-write-article'): void
    (e: 'edit-article', article: BlogPost): void
    (e: 'open-comments', article: BlogPost): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const authStore = useAuthStore()
const articlesStore = useArticlesStore()
const commentsStore = useCommentsStore()

// Computed
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

const publishedCount = computed(() =>
    myArticles.value.filter(article => article.isPublished).length
)

const draftCount = computed(() =>
    myArticles.value.filter(article => !article.isPublished).length
)

// Watch for changes in user articles
watch(() => articlesStore.allArticles, (newArticles) => {
    console.log('Articles store updated:', newArticles)
}, { deep: true })

watch(() => myArticles.value, (newMyArticles) => {
    console.log('My articles updated:', newMyArticles)
}, { deep: true })

// Methods
function closeModal(): void {
    emit('close')
}

function openWriteArticle(): void {
    emit('open-write-article')
    // Убираем closeModal() отсюда
}

function editArticle(article: BlogPost): void {
    emit('edit-article', article)
    // Убираем closeModal() отсюда
}

function deleteArticle(articleId: string): void {
    if (confirm('Are you sure you want to delete this article?')) {
        const success = articlesStore.deleteArticle(articleId)
        if (success) {
            // Можно добавить уведомление об успешном удалении
            console.log('Article deleted successfully')
        }
    }
}

function publishDraft(article: BlogPost): void {
    if (confirm('Are you sure you want to publish this draft?')) {
        const success = articlesStore.updateArticle(article.id, { isPublished: true })
        if (success) {
            console.log('Draft published successfully')
        }
    }
}

function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

function viewArticle(article: BlogPost): void {
    emit('edit-article', article)
    // Убираем closeModal() отсюда
}

function openComments(article: BlogPost): void {
    emit('open-comments', article)
    // Убираем closeModal() отсюда
}

function getCommentsCount(articleId: string): number {
    return commentsStore.getArticleComments(articleId).length
}

function getNewCommentsCount(articleId: string): number {
    return commentsStore.getNewCommentsCount(articleId)
}

// Handle escape key
function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        closeModal()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    commentsStore.loadComments() // Загружаем комментарии при монтировании
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from {
    opacity: 0;
    transform: scale(0.9);
}

.modal-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
}
</style>
