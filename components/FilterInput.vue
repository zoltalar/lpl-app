<template>
  <div class="input-group input-group-sm">
    <delayed-input
      :disabled="props.disabled"
      v-model="filter"
    />
    <button
      type="button"
      class="btn btn-secondary"
      :title="$t('clear_filter')"
      :aria-label="$t('clear_filter')"
      @click.prevent="clear"
      v-if="hasInput()"
      >
        <i class="mdi mdi-close"></i>
      </button>
  </div>
</template>
<script setup lang="ts">
// Vars
interface Props {
  modelValue?: string,
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false
})
const emits = defineEmits(['update:modelValue'])
// Computed
const filter = computed({
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
  filter.value = ''
}
const hasInput = (): boolean => {
  return filter.value !== ''
}
</script>