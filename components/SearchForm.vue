<template>
  <form class="form-default form-search" @submit.prevent>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        @keydown="typing = true"
        v-model="search"
      >
      <button
        type="button"
        class="btn btn-secondary"
        :title="$t('clear_search')"
        :aria-label="$t('close')"
        @click.prevent="clear"
        v-if="hasInput()"
      >
        <i class="mdi mdi-close"></i>
      </button>
      <slot />
    </div>
  </form>
</template>
<script setup lang="ts">
// Vars
interface Props {
  modelValue?: string
}
defineProps<Props>()
const emits = defineEmits(['update:modelValue', 'toggleFilters'])
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