<template>
  <form class="form-default" @submit.prevent="store">
    <div class="row">
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('slug')" class="form-label">
            {{ $t('slug') }}
            ({{ $t('computer_name') }})
          </label>
          <required-input />
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': error('slug') !== null}"
            :id="inputId('slug')"
            maxlength="255"
            v-model="form.slug"
          />
          <div class="invalid-feedback d-block" v-if="error('slug') !== null">
            {{ error('slug') }}
          </div>
          <div class="form-text" v-html="$t('messages.form_text_attribute_slug')" v-else></div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('input-type')" class="form-label">{{ $t('input_type') }}</label>
          <required-input />
          <select
            class="form-select"
            :class="{'is-invalid': error('input_type') !== null}"
            :id="inputId('input-type')"
            :aria-label="$t('select_input_type')"
            v-model="form.input_type"
          >
            <option :value="null"></option>
            <option :value="type" v-for="(name, type) in inputTypes">{{ name }}</option>
          </select>
          <div class="invalid-feedback d-block" v-if="error('input_type') !== null">
            {{ error('input_type') }}
          </div>
        </div>
      </div>
      <div class="col-lg-6" v-for="(label, i) in labels">
        <div class="form-group">
          <label :for="inputId('label-' + label.code)" class="form-label">
            {{ $t('label') }}
            -
            {{ languageName(label.code) }}
          </label>
          <required-input />
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': error('labels.' + i + '.label') !== null}"
            :id="inputId('label-' + label.code)"
            maxlength="255"
            v-model="labels[i].label"
          />
          <div class="invalid-feedback d-block" v-if="error('labels.' + i + '.label') !== null">
            {{ error('labels.' + i + '.label') }}
          </div>
        </div>        
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('maxlength')" class="form-label">{{ $t('max_length') }}</label>
          <required-input v-if="limitable" />
          <input
            type="number"
            class="form-control"
            :class="{'is-invalid': error('maxlength') !== null}"
            :id="inputId('maxlength')"
            min="1"
            max="32767"
            :disabled="!limitable"
            v-model="form.maxlength"
          />
          <div class="invalid-feedback d-block" v-if="error('maxlength') !== null">
            {{ error('maxlength') }}
          </div>
          <div class="form-text" v-html="$t('messages.form_text_attribute_maxlength')" v-else></div>
        </div>
      </div>
      <div class="col-lg-6" v-for="(placeholder, i) in placeholders">
        <div class="form-group">
          <label :for="inputId('placeholder-' + placeholder.code)" class="form-label">
            {{ $t('placeholder') }}
            -
            {{ languageName(placeholder.code) }}
          </label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': error('placeholders.' + i + '.placeholder') !== null}"
            :id="inputId('placeholder-' + placeholder.code)"
            maxlength="255"
            :disabled="!placeholderable"
            v-model="placeholders[i].placeholder"
          />
          <div class="invalid-feedback d-block" v-if="error('placeholders.' + i + '.placeholder') !== null">
            {{ error('placeholders.' + i + '.placeholder') }}
          </div>
          <div class="form-text" v-html="$t('messages.form_text_attribute_placeholder')"></div>
        </div>        
      </div>
      <div class="col-lg-12" v-for="(option, i) in options">
        <div class="form-group">
          <label :for="inputId('option-' + option.code)" class="form-label">
            {{ $t('options') }}
            -
            {{ languageName(option.code) }}
          </label>
          <required-input v-if="optionable" />
          <textarea
            class="form-control"
            :class="{'is-invalid': error('options.' + i + '.option') !== null}"
            :id="inputId('option-' + option.code)"
            rows="5"
            :disabled="!optionable"
            v-model="options[i].option"
          ></textarea>
          <div class="invalid-feedback d-block" v-if="error('options.' + i + '.option') !== null">
            {{ error('options.' + i + '.option') }}
          </div>
          <div class="form-text" v-html="$t('messages.form_text_attribute_option')" v-else></div>
        </div>        
      </div>
      <div class="col-lg-6" v-for="(text, i) in inputTexts">
        <div class="form-group">
          <label :for="inputId('input-text-' + text.code)" class="form-label">
            {{ $t('input_help_text') }}
            -
            {{ languageName(text.code) }}
          </label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': error('input_texts.' + i + '.text') !== null}"
            :id="inputId('input-text-' + text.code)"
            maxlength="255"
            v-model="inputTexts[i].text" 
          />
          <div class="invalid-feedback d-block" v-if="error('input_texts.' + i + '.text') !== null">
            {{ error('input_texts.' + i + '.text') }}
          </div>
        </div>        
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('list-order')" class="form-label">{{ $t('list_order') }}</label>
          <input
            type="number"
            class="form-control"
            :class="{'is-invalid': error('list_order') !== null}"
            :id="inputId('list-order')"
            v-model="form.list_order"
          />
          <div class="invalid-feedback d-block" v-if="error('list_order') !== null">
            {{ error('list_order') }}
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="form-group mb-0">
          <div class="form-check form-switch">
            <input
              type="checkbox"
              :id="inputId('required')"
              class="form-check-input"
              :true-value="1"
              :false-value="0"
              v-model="form.required"
            >
            <label :for="inputId('required')" class="form-check-label">{{ $t('required') }}</label>
          </div>
          <div class="form-check form-switch">
            <input
              type="checkbox"
              :id="inputId('active')"
              class="form-check-input"
              :true-value="1"
              :false-value="0"
              v-model="form.active"
            >
            <label :for="inputId('active')" class="form-check-label">{{ $t('active') }}</label>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type {
  IAttributeInputText,
  IAttributeLabel,
  IAttributeOption,
  IAttributePlaceholder,
  ILanguage
} from '@/types'
// Vars
const emits = defineEmits(['created', 'errors'])
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('attribute-create')
const {
  fields,
  form,
  labels,
  placeholders,
  options,
  inputTexts,
  languages,
  languageName,
  limitable,
  optionable,
  placeholderable
} = useFormAttribute()
const { inputTypes } = useAttribute()
const { $_ } = useNuxtApp()
// Watch
watch(languages, () => {
  if (languages.value) {
    languages.value.forEach((language: ILanguage) => {
      labels.value.push({ code: language.code, label: '' })
      placeholders.value.push({ code: language.code, placeholder: '' })
      options.value.push({ code: language.code, option: '' })
      inputTexts.value.push({ code: language.code, text: '' })
    })
  }
}, { immediate: true })
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  $_.forOwn(form, (value: any, key: string): void => {
    if ( ! $_.isNil(value)) {
      formData.append(key, value)
    }
  })
  if (labels.value.length > 0) {
    labels.value.forEach((label: IAttributeLabel, i) => {
      formData.append('labels[' + i + '][code]', label.code)
      formData.append('labels[' + i + '][label]', label.label)
    })
  }
  if (placeholders.value.length > 0) {
    placeholders.value.forEach((placeholder: IAttributePlaceholder, i) => {
      formData.append('placeholders[' + i + '][code]', placeholder.code)
      formData.append('placeholders[' + i + '][placeholder]', placeholder.placeholder)
    })
  }
  if (options.value.length > 0) {
    options.value.forEach((option: IAttributeOption, i) => {
      formData.append('options[' + i + '][code]', option.code)
      formData.append('options[' + i + '][option]', option.option)
    })
  }
  if (inputTexts.value.length > 0) {
    inputTexts.value.forEach((text: IAttributeInputText, i) => {
      formData.append('input_texts[' + i + '][code]', text.code)
      formData.append('input_texts[' + i + '][text]', text.text)
    })
  }
  return formData
}
const store = async (): Promise<void> => {
  const attribute: FormData = normalize()
  await useApi('/admin/attributes/store', {
    method: 'post',
    body: attribute,
    onResponse({ response }) {
      if (response._data.errors) {
        errors.value = getErrors(response._data.errors)
        emits('errors', toRaw(errors.value))
      } else if (response._data.data) {
        reset()
        emits('created')
      }
    }
  })
}
const reset = () => {
  Object.assign(form, fields)
  clearErrors()
}
defineExpose({ reset, store })
</script>