<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import QuadrantGrid from '@/components/QuadrantGrid.vue'
import Settings from '@/components/Settings.vue'
import { Moon, Sun, Settings as SettingsIcon } from 'lucide-vue-next'

const todoStore = useTodoStore()
const settingsStore = useSettingsStore()
const showSettings = ref(false)

const openSettings = () => {
  showSettings.value = true
}

const closeSettings = () => {
  showSettings.value = false
}

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between">
      <!-- Custom Slogan -->
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ settingsStore.customSlogan }}
      </div>

      <!-- Right Controls -->
      <div class="flex items-center gap-1">
        <!-- Dark Mode Toggle -->
        <button
          class="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          @click="settingsStore.toggleDarkMode"
        >
          <Sun v-if="settingsStore.isDarkMode" class="w-4 h-4" />
          <Moon v-else class="w-4 h-4" />
        </button>

        <!-- Settings Button -->
        <button
          class="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          @click="openSettings"
        >
          <SettingsIcon class="w-4 h-4" />
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-2 overflow-hidden">
      <QuadrantGrid />
    </main>

    <!-- Settings Panel -->
    <Settings v-if="showSettings" @close="closeSettings" />
  </div>
</template>

<style>
/* Global scrollbar styles */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Dark mode scrollbar */
.dark ::-webkit-scrollbar-thumb {
  background: #4b5563;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
