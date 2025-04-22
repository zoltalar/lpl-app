<template>
  <div class="input-attribute">
    <input
      type="text"
      class="form-control"
      :id="inputId"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :required="required"
      :disabled="props.disabled"
      v-model="attributeValue"
      v-if="inputType === 1"
    />
    <input
      type="number"
      class="form-control"
      :id="inputId"
      :placeholder="placeholder"
      :required="required"
      :disabled="props.disabled"
      v-model="attributeValue"
      v-else-if="inputType === 2"
    />
  </div>
</template>
<script setup lang="ts">
import type { IAttribute } from '@/types'
// Vars
interface Props {
  attribute?: IAttribute | null,
  modelValue?: string | number | null,
  prefix?: string | null,
  errored?: boolean,
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  errored: false,
  disabled: false
})
const emits = defineEmits(['update:modelValue'])
// Composables
const {
  inputId: attributeInputId,
  inputType: attributeInputType,
  maxlength: attributeMaxlength,
  placeholder: attributePlaceholder,
  required: attributeRequired
} = useAttribute()
// Computed
const attribute = computed<IAttribute>(() => {
  return props.attribute as IAttribute
})
const attributeValue = computed({
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
const inputId = computed<string>(() => {
  return attributeInputId(attribute.value, props.prefix)
})
const inputType = computed<number>(() => {
  return attributeInputType(attribute.value)
})
const maxlength = computed<number>(() => {
  return attributeMaxlength(attribute.value)
})
const placeholder = computed<string>(() => {
  return attributePlaceholder(attribute.value)
})
const required = computed<boolean>(() => {
  return attributeRequired(attribute.value)
})
</script>