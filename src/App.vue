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
    <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm">Q</span>
        </div>
        <h1 class="text-xl font-semibold text-gray-800">四象限待办</h1>
      </div>
      <div class="text-sm text-gray-500">
        拖拽待办项调整优先级
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-4 overflow-hidden">
      <QuadrantGrid />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between text-sm text-gray-500">
      <div class="flex gap-4">
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-red-500"></span>
          紧急重要
        </span>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          紧急不重要
        </span>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-blue-500"></span>
          重要不紧急
        </span>
        <span class="flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-gray-400"></span>
          不紧急不重要
        </span>
      </div>
      <div>
        按回车创建新待办，Esc 取消编辑
      </div>
    </footer>
  </div>
</template>

<style>
/* Global scrollbar styles */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
