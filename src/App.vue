<script setup lang="ts">
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { useSettingsStore } from '@/stores/settingsStore'
import QuadrantGrid from '@/components/QuadrantGrid.vue'
import { Moon, Sun } from 'lucide-vue-next'

const todoStore = useTodoStore()
const settingsStore = useSettingsStore()

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
          <span class="text-white font-bold text-xs">Q</span>
        </div>
        <h1 class="text-base font-semibold text-gray-800 dark:text-gray-100">四象限待办</h1>
      </div>

      <!-- Dark Mode Toggle -->
      <button
        class="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        @click="settingsStore.toggleDarkMode"
      >
        <Sun v-if="settingsStore.isDarkMode" class="w-4 h-4" />
        <Moon v-else class="w-4 h-4" />
      </button>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-2 overflow-hidden">
      <QuadrantGrid />
    </main>
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
