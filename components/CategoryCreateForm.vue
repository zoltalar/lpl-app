<template>
  <form novalidate @submit.prevent="store">
    <div class="mb-3">
      <label for="input-name" class="form-label">{{ $t('name') }}</label>
      <required-input />
      <input type="text" class="form-control" id="input-name" v-model="form.name">
      <div class="invalid-feedback d-block" v-if="error('name') !== null">
        {{ error('name') }}
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { ICategory } from '~/types'
const emits = defineEmits(['created'])
const fields = { name: '' }
const form: Partial<ICategory> = reactive({...fields})
const { errors, clearErrors, error, getErrors } = useForm()
// Functions
const store = async () => {
  await useApi('/admin/categories/store', {
    method: 'post',
    body: { ...form },
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
  const keys = Object.keys(form)
  keys.forEach((key: string) => {
    form[key] = fields[key]
  })
  clearErrors()
}
defineExpose({ reset, store })
</script>