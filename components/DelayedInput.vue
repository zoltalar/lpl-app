<template>
  <input
    type="text"
    class="form-control"
    @keydown="typing = true"
    v-model="value"
  />
</template>
<script setup lang="ts">
// Vars
interface Props {
  modelValue?: string,
  delay?: number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  delay: 400
})
const emits = defineEmits(['update:modelValue'])
const typing = ref<boolean>(false)
let timeout: any = null
// Computed
const value = computed({
  get: () => {
    if (props.modelValue) {
      return props.modelValue
    }
    return ''
  },
  set: (value) => {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => {
      typing.value = false
      emits('update:modelValue', value)
    }, props.delay)
  }
})
</script>