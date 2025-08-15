import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, AuthState, LoginForm, RegisterForm, LoginResult } from '../types/blog'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  // Computed
  const isAuthenticated = computed(() => !!user.value && !user.value.isGuest)
  const isGuest = computed(() => !user.value || user.value.isGuest)
  const currentUser = computed(() => user.value)

  // Initialize guest user
  function initializeGuest(): void {
    if (!user.value) {
      user.value = {
        id: 'guest',
        username: 'Guest',
        email: '',
        fullName: 'Guest',
        joinDate: new Date().toISOString(),
        isGuest: true
      }
    }
  }

  // Demo users data
  const demoUsers = {
    'writer@demo.com': {
      id: '1',
      username: 'techwriter',
      email: 'writer@demo.com',
      fullName: 'Sarah Johnson',
      bio: 'Tech writer and web development enthusiast. Love sharing insights about the latest trends.',
      joinDate: '2024-01-01T00:00:00Z',
      isGuest: false
    },
    'editor@demo.com': {
      id: '2',
      username: 'contenteditor',
      email: 'editor@demo.com',
      fullName: 'Michael Chen',
      bio: 'Content editor and lifestyle blogger. Passionate about sustainable living and personal development.',
      joinDate: '2024-01-15T00:00:00Z',
      isGuest: false
    }
  }

  // Login
  async function login(credentials: LoginForm): Promise<LoginResult> {
    isLoading.value = true
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const normalizedEmail = credentials.email.trim()
      const normalizedPassword = credentials.password.trim()
      
      const demoUser = demoUsers[normalizedEmail as keyof typeof demoUsers]
      
      if (!demoUser) {
        return { success: false, error: 'Email not found in database' }
      }
      
      if (normalizedPassword !== 'password123') {
        return { success: false, error: 'Invalid password' }
      }
      
      user.value = demoUser
      localStorage.setItem('user', JSON.stringify(demoUser))
      return { success: true }
      
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' }
    } finally {
      isLoading.value = false
    }
  }

  // Register
  async function register(userData: RegisterForm): Promise<boolean> {
    isLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock successful registration
      const newUser: User = {
        id: Date.now().toString(),
        username: userData.username,
        email: userData.email,
        fullName: userData.fullName,
        joinDate: new Date().toISOString(),
        isGuest: false
      }
      
      user.value = newUser
      localStorage.setItem('user', JSON.stringify(newUser))
      
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Logout
  function logout(): void {
    user.value = null
    localStorage.removeItem('user')
    initializeGuest()
  }

  // Update profile
  async function updateProfile(profileData: Partial<User>): Promise<boolean> {
    if (!user.value || user.value.isGuest) return false
    
    isLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      user.value = { ...user.value, ...profileData }
      localStorage.setItem('user', JSON.stringify(user.value))
      
      return true
    } catch (error) {
      console.error('Profile update failed:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Load user from localStorage
  function loadUser(): void {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser)
      } catch (error) {
        console.error('Failed to load user from localStorage:', error)
        initializeGuest()
      }
    } else {
      initializeGuest()
    }
  }

  // Get auth state
  const authState = computed<AuthState>(() => ({
    user: user.value,
    isAuthenticated: isAuthenticated.value,
    isLoading: isLoading.value
  }))

  return {
    // State
    user,
    isLoading,
    
    // Computed
    isAuthenticated,
    isGuest,
    currentUser,
    authState,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    loadUser,
    initializeGuest
  }
})
