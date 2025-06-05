<template>
  <div
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    data-bs-delay="8000"
    ref="toast"
  >
    <div class="toast-header">
      <slot name="header"></slot>
      <button type="button" class="btn-close" data-bs-dismiss="toast" :aria-label="$t('close')"></button>
    </div>
    <div class="toast-body">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
// Vars
const toast = ref<HTMLDivElement|null>(null)
// Composables
const { $bootstrap } = useNuxtApp()
// Functions
const bind = (): void => {
  (new $bootstrap.Toast(toast.value)).show()
}
// Hooks
onMounted(() => {
  bind()
})
</script>