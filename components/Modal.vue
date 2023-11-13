<template>
  <div class="modal fade" :class="css()" tabindex="-1" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: { 
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'sm',
    validator(value: string): boolean {
      return ['sm', 'md', 'lg', 'xl'].includes(value)
    }
  }
})
const css = (): Record<string, boolean> => {
  let classes: Record<string, boolean> = {}
  const key = ['modal', props.size].join('-')
  classes[key] = true
  return classes
}
</script>