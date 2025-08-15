<template>
    <Transition name="modal" appear>
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" @click="closeModal"></div>

            <!-- Modal Container -->
            <div class="relative min-h-screen flex items-center justify-center p-4">
                <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
                                <h2 class="text-3xl font-bold text-primary mb-2">
                                    {{ props.article?.isPublished ? 'View Article' : 'Edit Article' }}
                                </h2>
                                <p class="text-gray-600">
                                    {{ modalDescription }}
                                </p>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex items-center space-x-3">
                                <!-- Publish Draft Button (only show for drafts) -->
                                <button v-if="!props.article?.isPublished" @click="publishDraft" :disabled="isLoading"
                                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                                    <span v-if="!isLoading" class="flex items-center space-x-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>Publish Draft</span>
                                    </span>
                                    <span v-else class="flex items-center space-x-2">
                                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        <span>Publishing...</span>
                                    </span>
                                </button>

                                <!-- Save Changes Button (only show for drafts) -->
                                <button v-if="!props.article?.isPublished" @click="saveChanges" :disabled="isLoading"
                                    class="btn-primary disabled:opacity-50">
                                    <span v-if="!isLoading">Save Changes</span>
                                    <span v-else class="flex items-center space-x-2">
                                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                            </path>
                                        </svg>
                                        <span>Saving...</span>
                                    </span>
                                </button>

                                <!-- Close Button (for published articles) -->
                                <button v-if="props.article?.isPublished" @click="closeModal" class="btn-secondary">
                                    Close
                                </button>
                            </div>
                        </div>

                        <!-- Article Form -->
                        <form @submit.prevent="saveChanges" class="space-y-6">
                            <!-- Title -->
                            <div>
                                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Article
                                    Title</label>
                                <input id="title" v-model="form.title" type="text" required
                                    :disabled="props.article?.isPublished" :class="[
                                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-lg',
                                        props.article?.isPublished ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
                                    ]" placeholder="Enter your article title..." />
                            </div>

                            <!-- Category -->
                            <div>
                                <label for="category"
                                    class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select id="category" v-model="form.category" required
                                    :disabled="props.article?.isPublished" :class="[
                                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent',
                                        props.article?.isPublished ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
                                    ]">
                                    <option value="">Select a category</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Business">Business</option>
                                    <option value="Health">Health</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Food">Food</option>
                                </select>
                            </div>

                            <!-- Featured Image -->
                            <div>
                                <label for="image" class="block text-sm font-medium text-gray-700 mb-1">Featured Image
                                    URL</label>
                                <input id="image" v-model="form.image" type="url" :disabled="props.article?.isPublished"
                                    :class="[
                                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent',
                                        props.article?.isPublished ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
                                    ]" placeholder="https://images.unsplash.com/..." />

                                <!-- Image Preview -->
                                <div v-if="form.image" class="mt-3">
                                    <img :src="form.image" alt="Preview"
                                        class="w-full h-48 object-cover rounded-lg border border-gray-200"
                                        @error="handleImageError" />
                                </div>
                            </div>

                            <!-- Excerpt -->
                            <div>
                                <label for="excerpt"
                                    class="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                <textarea id="excerpt" v-model="form.excerpt" rows="3"
                                    :disabled="props.article?.isPublished" :class="[
                                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent',
                                        props.article?.isPublished ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
                                    ]" placeholder="Brief description of your article..."></textarea>
                            </div>

                            <!-- Content -->
                            <div>
                                <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Article
                                    Content</label>
                                <textarea id="content" v-model="form.content" rows="12"
                                    :disabled="props.article?.isPublished" :class="[
                                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-mono text-sm',
                                        props.article?.isPublished ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
                                    ]" placeholder="Write your article content here..."></textarea>
                            </div>

                            <!-- Read Time -->
                            <div>
                                <label for="readTime" class="block text-sm font-medium text-gray-700 mb-1">Estimated
                                    Read Time</label>
                                <input id="readTime" v-model="form.readTime" type="text"
                                    :disabled="props.article?.isPublished" :class="[
                                        'w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent',
                                        props.article?.isPublished ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
                                    ]" placeholder="e.g., 5 min read" />
                            </div>
                        </form>

                        <!-- Success Message -->
                        <div v-if="successMessage" class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p class="text-sm text-green-600">{{ successMessage }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useArticlesStore } from '../stores/articles'
import type { BlogPost } from '../types/blog'

interface Props {
    isOpen: boolean
    article: BlogPost | null
}

interface Emits {
    (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const articlesStore = useArticlesStore()

// State
const isLoading = ref(false)
const successMessage = ref('')

// Form data
const form = ref({
    title: '',
    category: '',
    image: '',
    excerpt: '',
    content: '',
    readTime: ''
})

// Watch for article prop changes to load data
watch(() => props.article, (newArticle) => {
    if (newArticle) {
        loadArticleData(newArticle)
    }
}, { immediate: true })

function loadArticleData(article: BlogPost): void {
    form.value = {
        title: article.title,
        category: article.category,
        image: article.image,
        excerpt: article.excerpt,
        content: article.content,
        readTime: article.readTime
    }
}

// Methods
function closeModal(): void {
    emit('close')
    resetForm()
}

function resetForm(): void {
    form.value = {
        title: '',
        category: '',
        image: '',
        excerpt: '',
        content: '',
        readTime: ''
    }
    successMessage.value = ''
}

function handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement
    target.style.display = 'none'
}

async function saveChanges(): Promise<void> {
    if (!form.value.title || !form.value.content || !form.value.category) {
        return
    }

    isLoading.value = true

    try {
        if (!props.article) return

        const success = articlesStore.updateArticle(props.article.id, {
            title: form.value.title,
            category: form.value.category,
            image: form.value.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
            excerpt: form.value.excerpt || form.value.title,
            content: form.value.content,
            readTime: form.value.readTime || '5 min read'
        })

        if (success) {
            successMessage.value = 'Article updated successfully!'
            setTimeout(() => {
                closeModal()
            }, 1500)
        } else {
            successMessage.value = 'Failed to update article. Please try again.'
        }
    } catch (error) {
        console.error('Failed to update article:', error)
        successMessage.value = 'Failed to update article. Please try again.'
    } finally {
        isLoading.value = false
    }
}

async function publishDraft(): Promise<void> {
    if (!form.value.title || !form.value.content || !form.value.category) {
        return
    }

    isLoading.value = true

    try {
        if (!props.article) return

        const success = articlesStore.updateArticle(props.article.id, {
            title: form.value.title,
            category: form.value.category,
            image: form.value.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
            excerpt: form.value.excerpt || form.value.title,
            content: form.value.content,
            readTime: form.value.readTime || '5 min read',
            isPublished: true // Публикуем черновик
        })

        if (success) {
            successMessage.value = 'Draft published successfully!'
            setTimeout(() => {
                closeModal()
            }, 1500)
        } else {
            successMessage.value = 'Failed to publish draft. Please try again.'
        }
    } catch (error) {
        console.error('Failed to publish draft:', error)
        successMessage.value = 'Failed to publish draft. Please try again.'
    } finally {
        isLoading.value = false
    }
}

// Handle escape key
function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
        closeModal()
    }
}

const modalDescription = computed(() =>
    props.article?.isPublished ? 'View your published article' : 'Update your article content'
)

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
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
</style>
