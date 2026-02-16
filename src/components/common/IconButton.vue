<script setup lang="ts">
interface Props {
  variant?: 'default' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="{
      // Variants
      'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:ring-gray-400': variant === 'default' || variant === 'ghost',
      'bg-transparent text-red-500 hover:bg-red-50 hover:text-red-700 focus:ring-red-400': variant === 'danger',
      // Sizes
      'p-1': size === 'sm',
      'p-2': size === 'md',
      'p-3': size === 'lg',
    }"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
