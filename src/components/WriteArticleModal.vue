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
                                <h2 class="text-3xl font-bold text-primary mb-2">Write Article</h2>
                                <p class="text-gray-600">Create and publish your content</p>
                            </div>

                            <!-- Action Buttons -->
                            <div class="flex items-center space-x-3">
                                <button @click="saveDraft" :disabled="isLoading"
                                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
                                    Save Draft
                                </button>
                                <button @click="publishArticle" :disabled="isLoading"
                                    class="btn-primary disabled:opacity-50">
                                    <span v-if="!isLoading">Publish Article</span>
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
                            </div>
                        </div>

                        <!-- Article Form -->
                        <form @submit.prevent="publishArticle" class="space-y-6">
                            <!-- Title -->
                            <div>
                                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Article
                                    Title</label>
                                <input id="title" v-model="form.title" type="text" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-lg"
                                    placeholder="Enter your article title..." />
                            </div>

                            <!-- Category -->
                            <div>
                                <label for="category"
                                    class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select id="category" v-model="form.category" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent">
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
                                <label for="image" class="block text-sm font-medium text-gray-700 mb-1">
                                    Featured Image URL <span class="text-gray-400">(optional)</span>
                                </label>
                                <input id="image" v-model="form.image" type="url"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                    placeholder="https://images.unsplash.com/..." />
                                <p class="text-xs text-gray-500 mt-1">Leave empty to use default image</p>
                            </div>

                            <!-- Excerpt -->
                            <div>
                                <label for="excerpt"
                                    class="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                                <textarea id="excerpt" v-model="form.excerpt" rows="3" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                    placeholder="Brief description of your article..."></textarea>
                            </div>

                            <!-- Content -->
                            <div>
                                <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Article
                                    Content</label>
                                <textarea id="content" v-model="form.content" rows="12" required
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-mono text-sm"
                                    placeholder="Write your article content here..."></textarea>
                            </div>

                            <!-- Read Time -->
                            <div>
                                <label for="readTime" class="block text-sm font-medium text-gray-700 mb-1">
                                    Estimated Read Time <span class="text-gray-400">(optional)</span>
                                </label>
                                <input id="readTime" v-model="form.readTime" type="text"
                                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                                    placeholder="e.g., 5 min read" />
                                <p class="text-xs text-gray-500 mt-1">Leave empty to use default (5 min read)</p>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useArticlesStore } from '../stores/articles'

interface Props {
    isOpen: boolean
}

interface Emits {
    (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const authStore = useAuthStore()
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

async function publishArticle(): Promise<void> {
    // Проверяем только обязательные поля для публикации
    if (!form.value.title || !form.value.content || !form.value.category) {
        console.log('Form validation failed:', form.value)
        return
    }

    isLoading.value = true

    try {
        const currentUser = authStore.currentUser
        console.log('Current user:', currentUser)

        if (!currentUser || currentUser.isGuest) {
            throw new Error('User not authenticated')
        }

        // Устанавливаем значения по умолчанию для необязательных полей
        const articleData = {
            title: form.value.title,
            excerpt: form.value.excerpt || form.value.title, // Если excerpt пустой, используем title
            content: form.value.content,
            image: form.value.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop', // Дефолтное изображение
            category: form.value.category,
            author: currentUser.fullName,
            readTime: form.value.readTime || '5 min read', // Дефолтное время чтения
            featured: false
        }

        console.log('Creating article with data:', articleData)

        const newArticle = articlesStore.createArticle(articleData, currentUser.id)

        console.log('Article created successfully:', newArticle)
        console.log('All articles after creation:', articlesStore.allArticles)

        successMessage.value = 'Article published successfully!'
        setTimeout(() => {
            closeModal()
        }, 1500)
    } catch (error) {
        console.error('Failed to publish article:', error)
        successMessage.value = 'Failed to publish article. Please try again.'
    } finally {
        isLoading.value = false
    }
}

async function saveDraft(): Promise<void> {
    // Для черновика проверяем только title и content
    if (!form.value.title || !form.value.content) {
        console.log('Draft validation failed:', form.value)
        return
    }

    isLoading.value = true

    try {
        const currentUser = authStore.currentUser
        if (!currentUser || currentUser.isGuest) {
            throw new Error('User not authenticated')
        }

        // Создаем черновик с isPublished: false
        const draftData = {
            title: form.value.title,
            excerpt: form.value.excerpt || form.value.title,
            content: form.value.content,
            image: form.value.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop',
            category: form.value.category || 'Technology',
            author: currentUser.fullName,
            readTime: form.value.readTime || '5 min read',
            featured: false
        }

        console.log('Saving draft with data:', draftData)

        const newDraft = articlesStore.createArticle(draftData, currentUser.id)

        // Обновляем статус на черновик
        articlesStore.updateArticle(newDraft.id, { isPublished: false })

        console.log('Draft saved successfully:', newDraft)

        successMessage.value = 'Draft saved successfully!'
        setTimeout(() => {
            successMessage.value = ''
        }, 3000)
    } catch (error) {
        console.error('Failed to save draft:', error)
        successMessage.value = 'Failed to save draft. Please try again.'
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