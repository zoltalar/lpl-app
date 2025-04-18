<template>
  <form novalidate @submit.prevent="store">
    <div class="form-group">
      <label :for="inputId('email')" class="form-label">{{ $t('email') }}</label>
      <required-input />
      <input
        type="email"
        class="form-control"
        :class="{'is-invalid': error('email') !== null}"
        :id="inputId('email')"
        maxlength="255"
        v-model="form.email"
      />
      <div class="invalid-feedback d-block" v-if="error('email') !== null">
        {{ error('email') }}
      </div>
    </div>
    <div class="form-group">
      <label :for="inputId('password')" class="form-label">{{ $t('password') }}</label>
      <div class="input-group">
        <input
          :type="inputType"
          class="form-control"
          :class="{'is-invalid': error('password') !== null}"
          :id="inputId('password')"
          maxlength="40"
          v-model="form.password"
        />
        <button type="button" class="btn btn-outline-secondary" @click.prevent="toggleInput">
          <i :class="inputIcon"></i>
        </button>
      </div>
      <div class="invalid-feedback d-block" v-if="error('password') !== null">
        {{ error('password') }}
      </div>
    </div>
    <div class="form-group">
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('html-email')"
          class="form-check-input"
          aria-describedby="text-html-email"
          :true-value="1"
          :false-value="0"
          v-model="form.html_email"
        />
        <label :for="inputId('html-email')" class="form-check-label">{{ $t('html_email') }}</label>
      </div>
      <div id="text-html-email" class="form-text" v-html="$t('messages.form_text_user_html_email')"></div>
    </div>
    <div class="form-group">
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('confirmed')"
          class="form-check-input"
          aria-describedby="text-confirmed"
          :true-value="1"
          :false-value="0"
          v-model="form.confirmed"
        />
        <label :for="inputId('confirmed')" class="form-check-label">{{ $t('confirmed') }}</label>
      </div>
      <div id="text-confirmed" class="form-text" v-html="$t('messages.form_text_user_confirmed')"></div>
    </div>        
    <div class="form-group">
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('blacklisted')"
          class="form-check-input"
          aria-describedby="text-blacklisted"
          :true-value="1"
          :false-value="0"
          v-model="form.blacklisted"
        />
        <label :for="inputId('blacklisted')" class="form-check-label">{{ $t('blacklisted') }}</label>
      </div>
      <div id="text-blacklisted" class="form-text" v-html="$t('messages.form_text_user_blacklisted')"></div>
    </div>
    <div class="form-group mb-0">
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('active')"
          class="form-check-input"
          aria-describedby="text-active"
          :true-value="1"
          :false-value="0"
          v-model="form.active"
        />
        <label :for="inputId('active')" class="form-check-label">{{ $t('active') }}</label>
      </div>
      <div id="text-active" class="form-text">{{ $t('messages.form_text_subscriber_active') }}</div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { ISubscriber } from '@/types'
// Vars
const emits = defineEmits(['created'])
const fields = {
  email: '',
  password: '',
  html_email: 1,
  confirmed: 0,
  blacklisted: 0,
  active: 1
}
const form: Partial<ISubscriber> = reactive({...fields})
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('subscriber-create')
const { inputType, inputIcon, toggleInput } = usePassword()
const { $_ } = useNuxtApp()
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
  const subscriber: FormData = normalize()
  await useApi('/admin/subscribers/store', {
    method: 'post',
    body: subscriber,
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