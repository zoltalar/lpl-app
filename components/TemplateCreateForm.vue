<template>
  <form class="form-default" @submit.prevent="store">
    <div class="form-group">
      <label :for="inputId('name')" class="form-label">{{ $t('name') }}</label>
      <required-input />
      <input
        type="text"
        class="form-control"
        :class="{'is-invalid': error('name') !== null}"
        :id="inputId('name')"
        maxlength="255"
        v-model="form.name"
      />
      <div class="invalid-feedback d-block" v-if="error('name') !== null">
        {{ error('name') }}
      </div>
    </div>
    <div class="form-group">
      <label :for="inputId('content')" class="form-label">{{ $t('content') }}</label>
      <required-input />
      <textarea
        class="form-control"
        :class="{'is-invalid': error('content') !== null}"
        :id="inputId('content')"
        rows="10"
        v-model="form.content"
      ></textarea>
      <div class="invalid-feedback d-block" v-if="error('content') !== null">
        {{ error('content') }}
      </div>
    </div>
    <div class="form-group mb-0">
      <label class="form-label">{{ $t('set_as_default?') }}</label>
      <div class="form-check">
        <input
          type="checkbox"
          :id="inputId('option-default')"
          class="form-check-input"
          :true-value="1"
          :false-value="0"
          v-model="options.default"
        />
        <label :for="inputId('option-default')" class="form-check-label">
          {{ $t('yes') }}
        </label>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
// Vars
const emits = defineEmits(['created'])
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('template-create')
const { fields, form, options } = useFormTemplate()
const { $_ } = useNuxtApp()
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  $_.forOwn(form, (value: any, key: string): void => {
    if ( ! $_.isNil(value)) {
      formData.append(key, value)
    }
  })
  $_.forOwn(options, (value: number, key: string): void => {
    formData.append('options[' + key + ']', value.toString())
  })
  return formData
}
const store = async () => {
  const template: FormData = normalize()
  await useApi('/admin/templates/store', {
    method: 'post',
    body: template,
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