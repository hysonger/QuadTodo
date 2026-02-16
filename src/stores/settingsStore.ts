import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { QuadrantConfig } from '@/types'

const STORAGE_KEY = 'quad-todo-settings'

export const useSettingsStore = defineStore('settings', () => {
  // State
  const showCompleted = ref(false)
  const compactMode = ref(false)
  const isDarkMode = ref(false)

  // Quadrant configurations
  const quadrants = ref<QuadrantConfig[]>([
    {
      type: 'q1',
      title: '重要且紧急',
      subtitle: '立即做',
      isUrgent: true,
      isImportant: true,
      bgColor: 'bg-q1-bg',
      borderColor: 'border-q1-border',
      textColor: 'text-q1-text',
    },
    {
      type: 'q2',
      title: '紧急不重要',
      subtitle: '委托他人',
      isUrgent: true,
      isImportant: false,
      bgColor: 'bg-q2-bg',
      borderColor: 'border-q2-border',
      textColor: 'text-q2-text',
    },
    {
      type: 'q3',
      title: '重要不紧急',
      subtitle: '计划做',
      isUrgent: false,
      isImportant: true,
      bgColor: 'bg-q3-bg',
      borderColor: 'border-q3-border',
      textColor: 'text-q3-text',
    },
    {
      type: 'q4',
      title: '不紧急不重要',
      subtitle: '尽量不做',
      isUrgent: false,
      isImportant: false,
      bgColor: 'bg-q4-bg',
      borderColor: 'border-q4-border',
      textColor: 'text-q4-text',
    },
  ])

  // Getters
  const getQuadrantConfig = (type: string) => {
    return quadrants.value.find(q => q.type === type)
  }

  // Actions
  const loadSettings = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      if (data) {
        const parsed = JSON.parse(data)
        showCompleted.value = parsed.showCompleted ?? false
        compactMode.value = parsed.compactMode ?? false
        isDarkMode.value = parsed.isDarkMode ?? false
      }
    } catch {
      // Use defaults
    }
  }

  const saveSettings = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        showCompleted: showCompleted.value,
        compactMode: compactMode.value,
        isDarkMode: isDarkMode.value,
      }))
    } catch {
      // Ignore errors
    }
  }

  const toggleShowCompleted = () => {
    showCompleted.value = !showCompleted.value
  }

  const toggleCompactMode = () => {
    compactMode.value = !compactMode.value
  }

  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    updateDarkModeClass()
  }

  const updateDarkModeClass = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Auto-save on changes
  watch([showCompleted, compactMode, isDarkMode], saveSettings, { deep: true })

  // Initialize
  loadSettings()
  updateDarkModeClass()

  return {
    showCompleted,
    compactMode,
    isDarkMode,
    quadrants,
    getQuadrantConfig,
    toggleShowCompleted,
    toggleCompactMode,
    toggleDarkMode,
    loadSettings,
    saveSettings,
  }
})
