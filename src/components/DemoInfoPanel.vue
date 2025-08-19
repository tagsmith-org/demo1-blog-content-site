<template>
    <div class="demo-info-container">
        <!-- Info Button -->
        <button @click="togglePanel"
            class="fixed top-4 right-4 z-50 w-12 h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
            :class="{ 'bg-green-400 hover:bg-green-500': isPanelOpen }">
            <svg v-if="!isPanelOpen" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
            </svg>
            <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>

        <!-- Info Panel -->
        <div class="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-yellow-50 to-orange-50 border-b-4 border-yellow-300 shadow-lg transition-transform duration-500 ease-in-out"
            :class="isPanelOpen ? 'transform translate-y-0' : 'transform -translate-y-full'">
            <div class="container mx-auto px-4 py-6">
                <div class="max-w-4xl mx-auto">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <svg class="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Demo Site Information
                            </h2>

                            <div class="grid md:grid-cols-2 gap-8 mb-8">
                                <!-- Features Section -->
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700 mb-3">🚀 Key Features</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Modern Vue 3 + TypeScript architecture</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Responsive design with Tailwind CSS</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Real-time search with autocomplete</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Category filtering and navigation</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Modal-based article viewing</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-green-500 mr-2">✓</span>
                                            <span>Pinia state management</span>
                                        </li>
                                    </ul>
                                </div>

                                <!-- Technical Details -->
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-700 mb-3">⚙️ Technical Stack</h3>
                                    <ul class="space-y-2 text-gray-600">
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>Frontend:</strong> Vue 3, TypeScript, Vite</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>Styling:</strong> Tailwind CSS, Headless UI</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>State:</strong> Pinia stores</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>Deployment:</strong> GitHub Actions + Nginx</span>
                                        </li>
                                        <li class="flex items-start">
                                            <span class="text-blue-500 mr-2">•</span>
                                            <span><strong>Domain:</strong> demo1.websmith-shop.com</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <!-- About This Demo Section -->
                            <div class="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h3 class="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                                    <svg class="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                                        </path>
                                    </svg>
                                    About This Demo
                                </h3>
                                <div class="space-y-2 text-gray-700">
                                    <div><strong>Project:</strong> BlogHub - Modern Blog Content Platform</div>
                                    <div><strong>Purpose:</strong> Showcase modern blog functionality with Vue 3 and
                                        TypeScript</div>
                                    <div><strong>Target:</strong> Content creators, publishers, and media companies
                                    </div>
                                </div>
                            </div>

                            <!-- Demo Limitations Section -->
                            <div class="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                <h3 class="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                                    <svg class="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z">
                                        </path>
                                    </svg>
                                    ! Demo Limitations
                                </h3>
                                <ul class="space-y-2 text-gray-700">
                                    <li class="flex items-start">
                                        <span class="text-orange-500 mr-2">•</span>
                                        <span><strong>No Real Authentication:</strong> Login/register is
                                            simulated</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-orange-500 mr-2">•</span>
                                        <span><strong>No Email Sending:</strong> Contact forms don't actually send
                                            emails</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-orange-500 mr-2">•</span>
                                        <span><strong>Local Data:</strong> All content is static demo data</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-orange-500 mr-2">•</span>
                                        <span><strong>Demo Articles:</strong> All articles are placeholder
                                            content</span>
                                    </li>
                                    <li class="flex items-start">
                                        <span class="text-orange-500 mr-2">•</span>
                                        <span><strong>No Backend:</strong> No real database or API integration</span>
                                    </li>
                                </ul>
                            </div>

                            <!-- Demo Instructions -->
                            <div class="mt-6 p-4 bg-white rounded-lg border border-yellow-200">
                                <h3 class="text-lg font-semibold text-gray-700 mb-2">🎯 Try These Features</h3>
                                <div class="grid sm:grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <strong>Search:</strong> Type in the search bar to filter articles
                                    </div>
                                    <div>
                                        <strong>Categories:</strong> Click on category cards to explore topics
                                    </div>
                                    <div>
                                        <strong>Articles:</strong> Click "Read Full Article" to open modals
                                    </div>
                                    <div>
                                        <strong>View All:</strong> Toggle between recent and all articles
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Overlay -->
        <div v-if="isPanelOpen" @click="closePanel" class="fixed inset-0 bg-black bg-opacity-25 z-30"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isPanelOpen = ref(false)

function togglePanel(): void {
    isPanelOpen.value = !isPanelOpen.value
}

function closePanel(): void {
    isPanelOpen.value = false
}

// Close panel on escape key
function handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && isPanelOpen.value) {
        closePanel()
    }
}

// Add keyboard listener
if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
}
</script>

<style scoped>
.demo-info-container {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
</style>
