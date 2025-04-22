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
    <textarea
      class="form-control"
      :id="inputId"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :required="required"
      :disabled="props.disabled"
      rows="3"
      v-model="attributeValue"
      v-else-if="inputType === 3"
    ></textarea>
    <select
      class="form-select"
      :id="inputId"
      :required="required"
      :disabled="props.disabled"
      v-model="attributeValue"
      v-else-if="inputType === 4"
    >
      <option :value="option.value" v-for="option in selectOptions">{{ option.text }}</option>
    </select>
    <div v-else-if="inputType === 5">
      <div class="form-check" v-for="(option, i) in options">
        <input
          type="radio"
          :id="inputId + '-' + i"
          class="form-check-input"
          :name="inputName"
          :value="option"
          :required="required"
          v-model="attributeValue"
        />
        <label :for="inputId + '-' + i" class="form-check-label">
          {{ option }}
        </label>
      </div>
    </div>
    <input
      type="date"
      class="form-control"
      :id="inputId"
      :required="required"
      :disabled="props.disabled"
      v-model="attributeValue"
      v-else-if="inputType === 6"
    />
  </div>
</template>
<script setup lang="ts">
import type { IAttribute, TSelectOption } from '@/types'
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
  inputName: attributeInputName,
  inputType: attributeInputType,
  maxlength: attributeMaxlength,
  option: attributeOption,
  placeholder: attributePlaceholder,
  required: attributeRequired
} = useAttribute()
const { phrases } = useString()
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
const inputName = computed<string>(() => {
  return attributeInputName(attribute.value)
})
const inputType = computed<number>(() => {
  return attributeInputType(attribute.value)
})
const maxlength = computed<number>(() => {
  return attributeMaxlength(attribute.value)
})
const option = computed<string>(() => {
  return attributeOption(attribute.value)
})
const options = computed<any[]>(() => {
  const options: any[] = []
  if (option.value) {
    phrases(option.value).forEach((phrase: any) => {
      options.push(phrase)
    })
  }
  return options
})
const placeholder = computed<string>(() => {
  return attributePlaceholder(attribute.value)
})
const required = computed<boolean>(() => {
  return attributeRequired(attribute.value)
})
const selectOptions = computed<TSelectOption[]>(() => {
  const options: TSelectOption[] = []
  if (placeholder.value) {
    options.push({
      value: '',
      text: placeholder.value
    })
  }
  if (option.value) {
    phrases(option.value).forEach((phrase: any) => {
      options.push({
        value: phrase,
        text: phrase
      })
    })
  }
  return options
})
</script>