<template>
  <form class="form-search" @submit.prevent>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        @keydown="typing = true"
        v-model="search"
      >
      <button
        type="button"
        class="btn-close"
        :title="$t('clear_search')"
        :aria-label="$t('close')"
        @click.prevent="clear"
        v-if="hasInput()"></button>
      <button type="submit" class="btn btn-secondary">
        <i class="mdi mdi-text-search" />
      </button>
    </div>
  </form>
</template>
<script setup lang="ts">
defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const search = ref<string>('')
const typing = ref<boolean>(false)
let timeout: any = null
// Watch
watch(search, () => {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  timeout = setTimeout(() => {
    typing.value = false
    emits('update:modelValue', search.value)
  }, 400)
})
// Functions
const clear = (): void => {
  search.value = ''
}
const hasInput = (): boolean => {
  return search.value !== ''
}
</script>