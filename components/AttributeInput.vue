<template>
  <div class="input-attribute">
    <input
      type="text"
      class="form-control"
      :class="{'is-invalid': props.errored}"
      :id="inputId"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :required="required"
      :disabled="props.disabled"
      v-model="model"
      v-if="inputType === 1"
    />
    <input
      type="number"
      class="form-control"
      :class="{'is-invalid': props.errored}"
      :id="inputId"
      :placeholder="placeholder"
      :required="required"
      :disabled="props.disabled"
      v-model="model"
      v-else-if="inputType === 2"
    />
    <textarea
      class="form-control"
      :class="{'is-invalid': props.errored}"
      :id="inputId"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :required="required"
      :disabled="props.disabled"
      rows="3"
      v-model="model"
      v-else-if="inputType === 3"
    ></textarea>
    <select
      class="form-select"
      :class="{'is-invalid': props.errored}"
      :id="inputId"
      :required="required"
      :disabled="props.disabled"
      v-model="model"
      v-else-if="inputType === 4"
    >
      <option></option>
      <optgroup :label="optgroupLabel" v-for="(options, optgroupLabel) in selectOptions">
        <option :value="option" v-for="option in options">{{ option }}</option>
      </optgroup>
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
          v-model="model"
        />
        <label :for="inputId + '-' + i" class="form-check-label">
          {{ option }}
        </label>
      </div>
    </div>
    <input
      type="date"
      class="form-control"
      :class="{'is-invalid': props.errored}"
      :id="inputId"
      :required="required"
      :disabled="props.disabled"
      v-model="model"
      v-else-if="inputType === 6"
    />
  </div>
</template>
<script setup lang="ts">
import type { IAttribute, ICountry, IState } from '@/types'
// Vars
interface Props {
  attribute?: IAttribute | null,
  modelValue?: string | number | null,
  prefix?: string | null,
  errored?: boolean,
  disabled?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  errored: false,
  disabled: false
})
const model = defineModel<string | undefined>({
  required: true
})
// Composables
const {
  dynamicOption,
  inputId: attributeInputId,
  inputName: attributeInputName,
  inputType: attributeInputType,
  label: attributeLabel,
  maxlength: attributeMaxlength,
  option: attributeOption,
  placeholder: attributePlaceholder,
  required: attributeRequired
} = useAttribute()
const { countries: ungroupedCountries } = useCountry()
const { phrases } = useString()
// Computed
const attribute = computed<IAttribute>(() => {
  return props.attribute as IAttribute
})
const countries = computed<Record<string, string[]>>(() => {
  let countries: Record<string, string[]> = {}
  ungroupedCountries.value.forEach((country: ICountry) => {
    if (! countries[country.name]) {
      countries[country.name] = []
    }
    country.states?.forEach((state: IState) => {
      countries[country.name].push(state.name)
    })
  })
  return countries
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
const label = computed<string>(() => {
  return attributeLabel(attribute.value)
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
const selectOptions = computed<Record<string, string[]>>(() => {
  let options: Record<string, string[]> = {}
  if (dynamicOption(option.value)) {
    switch(option.value) {
      case '[STATES]':
        options = countries.value
        break
    }
  } else {
    options[label.value] = []
    if (placeholder.value) {
      options[label.value].push(placeholder.value)
    }
    if (option.value) {
      phrases(option.value).forEach((phrase: any) => {
        options[label.value].push(phrase.toString())
      })
    }
  }
  return options
})
</script>