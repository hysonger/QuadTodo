<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface Props {
  show: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'danger'
}

withDefaults(defineProps<Props>(), {
  title: 'Confirm',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
})

const emit = defineEmits<{
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div class="absolute inset-0 bg-black/50" @click="handleCancel" />
        <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
          <button
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            @click="handleCancel"
          >
            <X class="w-5 h-5" />
          </button>

          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {{ title }}
          </h3>

          <p class="text-gray-600 dark:text-gray-300 mb-6">
            {{ message }}
          </p>

          <div class="flex justify-end gap-3">
            <button
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              @click="handleCancel"
            >
              {{ cancelText }}
            </button>
            <button
              class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
              :class="{
                'bg-blue-500 hover:bg-blue-600': variant === 'default',
                'bg-red-500 hover:bg-red-600': variant === 'danger',
              }"
              @click="handleConfirm"
            >
              {{ confirmText }}
            </button>
            <slot name="extra" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
