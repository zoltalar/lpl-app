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
          <select class="form-select" :id="inputId('input-type')" :aria-label="$t('select_input_type')" v-model="form.input_type">
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
          <input type="text" class="form-control" :id="inputId('label-' + label.code)" maxlength="255" v-model="labels[i].label" />
          <div class="invalid-feedback d-block" v-if="error('labels.' + i + '.label') !== null">
            {{ error('labels.' + i + '.label') }}
          </div>
        </div>        
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('maxlength')" class="form-label">{{ $t('max_length') }}</label>
          <input type="number" class="form-control" :id="inputId('maxlength')" min="1" max="32767" v-model="form.maxlength" />
          <div class="invalid-feedback d-block" v-if="error('maxlength') !== null">
            {{ error('maxlength') }}
          </div>
          <div class="form-text" v-html="$t('messages.form_text_attribute_maxlength')" v-else></div>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type {
  IAttribute,
  IAttributeLabel,
  ILanguage
} from '@/types'
// Vars
const emits = defineEmits(['created'])
const fields = {
  slug: '',
  input_type: null,
  maxlength: 255,
  required: 0,
  active: 1
}
const form: Partial<IAttribute> = reactive({...fields})
const labels = ref<IAttributeLabel[]>([])
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('attribute-create')
const { inputTypes } = useAttribute()
const { languages, name: languageName } = useLanguage()
const { $_ } = useNuxtApp()
// Watch
watch(languages, () => {
  if (languages.value) {
    languages.value.forEach((language: ILanguage) => {
      labels.value.push({ code: language.code, label: '' })
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
  return formData
}
const store = async () => {
  const attribute: FormData = normalize()
  await useApi('/admin/attributes/store', {
    method: 'post',
    body: attribute,
    onResponse({ request, response, options }) {
      if (response._data.errors) {
        errors.value = getErrors(response._data.errors)
      } else if (response._data.data) {
        reset()
        emits('created')
      }
    },
    onResponseError({ request, response, options }) {
      errors.value = getErrors(response._data.errors)
    }
  })
}
const reset = () => {
  Object.assign(form, fields)
  clearErrors()
}
defineExpose({ reset, store })
</script>