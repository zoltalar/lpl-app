<template>
  <form class="form-default" novalidate @submit.prevent="store">
    <div class="form-group">
      <label :for="inputId('first-name')" class="form-label">{{ $t('first_name') }}</label>
      <required-input />
      <input
        type="text"
        class="form-control"
        :class="{'is-invalid': error('first_name') !== null}"
        :id="inputId('first-name')"
        maxlength="100"
        v-model="form.first_name"
      />
      <div class="invalid-feedback d-block" v-if="error('first_name') !== null">
        {{ error('first_name') }}
      </div>
    </div>
    <div class="form-group">
      <label :for="inputId('last-name')" class="form-label">{{ $t('last_name') }}</label>
      <required-input />
      <input
        type="text"
        class="form-control"
        :class="{'is-invalid': error('last_name') !== null}"
        :id="inputId('last-name')"
        maxlength="100"
        v-model="form.last_name"
      />
      <div class="invalid-feedback d-block" v-if="error('last_name') !== null">
        {{ error('last_name') }}
      </div>
    </div>
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
      <label :for="inputId('phone')" class="form-label">{{ $t('phone') }}</label>
      <input
        type="text"
        class="form-control"
        :class="{'is-invalid': error('phone') !== null}"
        :id="inputId('phone')"
        maxlength="20"
        v-model="form.phone"
      />
      <div class="invalid-feedback d-block" v-if="error('phone') !== null">
        {{ error('phone') }}
      </div>
    </div>
    <div class="form-group">
      <label for="input-password" class="form-label">{{ $t('password') }}</label>
      <required-input />
      <div class="input-group">
        <input
          :type="inputType"
          class="form-control"
          :class="{'is-invalid': error('password') !== null}"
          id="input-password"
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
          :id="inputId('active')"
          class="form-check-input"
          aria-describedby="text-active"
          :true-value="1"
          :false-value="0"
          v-model="form.active"
        />
        <label :for="inputId('active')" class="form-check-label">{{ $t('active') }}</label>
      </div>
      <div id="text-active" class="form-text">{{ $t('messages.form_text_user_active') }}</div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IUser } from '~/types'
// Vars
const emits = defineEmits(['created'])
const fields = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  active: 1
}
const form: Partial<IUser> = reactive({...fields})
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('user-create')
const { inputType, inputIcon, toggleInput } = usePassword()
const { $_ } = useNuxtApp()
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  $_.forOwn(form, (value: any, key: string): void => {
    formData.append(key, value)
  })
  return formData
}
const store = async () => {
  const user: FormData = normalize()
  await useApi('/admin/users/store', {
    method: 'post',
    body: user,
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