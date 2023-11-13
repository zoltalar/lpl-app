<template>
  <form @submit.prevent="store" novalidate>
    <div class="mb-3">
      <label for="input-email" class="form-label">{{ $t('email') }}</label>
      <span class="text-danger ms-1">*</span>
      <input type="email" class="form-control" id="input-email" aria-describedby="text-email" v-model="form.email">
      <div class="invalid-feedback d-block" v-if="error('email') !== null">
        {{ error('email') }}
      </div>
    </div>
    <div class="mb-3">
      <label for="input-password" class="form-label">{{ $t('password') }}</label>
      <input type="password" class="form-control" id="input-password" v-model="form.password">
      <div class="invalid-feedback d-block" v-if="error('password') !== null">
        {{ error('password') }}
      </div>
    </div>
    <div class="mb-3">
      <div class="form-check form-switch">
        <input type="checkbox" id="input-html-email" class="form-check-input" aria-describedby="text-html-email" :true-value="1" :false-value="0" v-model="form.html_email">
        <label for="input-html-email" class="form-check-label">{{ $t('html_email') }}</label>
      </div>
      <div id="text-html-email" class="form-text">{{ $t('messages.form_text_user_html_email') }}</div>
    </div>
    <div class="mb-3">
      <div class="form-check form-switch">
        <input type="checkbox" id="input-confirmed" class="form-check-input" aria-describedby="text-confirmed" :true-value="1" :false-value="0" v-model="form.confirmed">
        <label for="input-confirmed" class="form-check-label">{{ $t('confirmed') }}</label>
      </div>
      <div id="text-confirmed" class="form-text">{{ $t('messages.form_text_user_confirmed') }}</div>
    </div>        
    <div class="mb-3">
      <div class="form-check form-switch">
        <input type="checkbox" id="input-blacklisted" class="form-check-input" aria-describedby="text-blacklisted" :true-value="1" :false-value="0" v-model="form.blacklisted">
        <label for="input-blacklisted" class="form-check-label">{{ $t('blacklisted') }}</label>
      </div>
      <div id="text-blacklisted" class="form-text">{{ $t('messages.form_text_user_blacklisted') }}</div>
    </div>
    <div class="mb-3">
      <div class="form-check form-switch">
        <input type="checkbox" id="input-disabled" class="form-check-input" aria-describedby="text-disabled" :true-value="1" :false-value="0" v-model="form.disabled">
        <label for="input-disabled" class="form-check-label">{{ $t('disabled') }}</label>
      </div>
      <div id="text-disabled" class="form-text">{{ $t('messages.form_text_user_disabled') }}</div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IUser } from '~/types'
const emits = defineEmits(['created'])
const fields = {
  email: '',
  password: '',
  html_email: 1,
  confirmed: 0,
  blacklisted: 0,
  disabled: 0
}
const form: Partial<IUser> = reactive({...fields})
const { errors, clearErrors, error, getErrors } = useForm()
// Functions
const store = async () => {
  await useApi('/admin/users/store', {
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