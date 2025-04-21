<template>
  <label :for="inputId" class="form-label">{{ label }}</label>
  <required-input v-if="required" />
</template>
<script setup lang="ts">
import type { IAttribute } from '@/types'
// Vars
interface Props {
  attribute?: IAttribute | null,
  prefix?: string | null
}
const props = defineProps<Props>()
// Composables
const {
  inputId: attributeInputId,
  label: attributeLabel,
  required: attributeRequired
} = useAttribute()
// Computed
const attribute = computed<IAttribute>(() => {
  return props.attribute as IAttribute
})
const inputId = computed<string>(() => {
  return attributeInputId(attribute.value, props.prefix)
})
const label = computed<string>(() => {
  return attributeLabel(attribute.value)
})
const required = computed<boolean>(() => {
  return attributeRequired(attribute.value)
})
</script>