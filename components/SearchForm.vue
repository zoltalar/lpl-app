<template>
  <form class="form-default form-search" @submit.prevent>
    <div class="input-group">
      <delayed-input v-model="search" />
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
const emits = defineEmits(['update:modelValue'])
const search = ref<string>('')
// Watch
watch(search, () => {
  emits('update:modelValue', search.value)
})
// Functions
const clear = (): void => {
  search.value = ''
}
const hasInput = (): boolean => {
  return search.value !== ''
}
</script>