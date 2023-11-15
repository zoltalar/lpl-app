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
    <div class="mb-3">
      <label for="input-description" class="form-label">{{ $t('description') }}</label>
      <textarea class="form-control" id="input-description" rows="5" v-model="form.description"></textarea>
      <div class="invalid-feedback d-block" v-if="error('description') !== null">
        {{ error('description') }}
      </div>
    </div>
    <div class="mb-3">
      <label for="input-list-order" class="form-label">{{ $t('list_order') }}</label>
      <input type="number" class="form-control" id="input-list-order" v-model="form.list_order">
      <div class="invalid-feedback d-block" v-if="error('list_order') !== null">
        {{ error('list_order') }}
      </div>
    </div>
    <div class="mb-3">
      <div class="form-check form-switch">
        <input type="checkbox" id="input-active" class="form-check-input" aria-describedby="text-active" :true-value="1" :false-value="0" v-model="form.active">
        <label for="input-active" class="form-check-label">{{ $t('active') }}</label>
      </div>
      <div id="text-active" class="form-text">{{ $t('messages.form_text_list_active') }}</div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IList } from '~/types'
const emits = defineEmits(['created'])
const fields = {
  name: '',
  description: '',
  list_order: 0,
  active: 0
}
const form: Partial<IList> = reactive({...fields})
const { errors, clearErrors, error, getErrors } = useForm()
// Functions
const store = async () => {
  await useApi('/admin/lists/store', {
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