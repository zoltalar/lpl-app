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
const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})
const emits = defineEmits(['update:modelValue'])
// Computed
const search = computed({
  get: () => {
    if (props.modelValue) {
      return props.modelValue
    }
    return ''
  },
  set: (value) => {
    emits('update:modelValue', value)
  }
})
// Functions
const clear = (): void => {
  search.value = ''
}
const hasInput = (): boolean => {
  return search.value !== ''
}
</script>