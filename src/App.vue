<script setup lang="ts">
import { onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import QuadrantGrid from '@/components/QuadrantGrid.vue'

const todoStore = useTodoStore()

onMounted(() => {
  todoStore.fetchTodos()
})
</script>

<template>
  <div class="h-screen flex flex-col bg-gray-100">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
          <span class="text-white font-bold text-xs">Q</span>
        </div>
        <h1 class="text-base font-semibold text-gray-800">四象限待办</h1>
      </div>
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
</style>
