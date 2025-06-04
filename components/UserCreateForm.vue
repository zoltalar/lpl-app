<template>
  <form class="form-default" @submit.prevent="store">
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
      <label :for="inputId('password')" class="form-label">{{ $t('password') }}</label>
      <required-input />
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
      <label :for="inputId('language-id')" class="form-label">{{ $t('language') }}</label>
      <select :id="inputId('language-id')" class="form-select" :disabled="languages.length === 0" v-model="form.language_id">
        <option :value="null"></option>
        <option :value="language.id" v-for="language in languages">{{ language.name }}</option>
      </select>
      <div class="invalid-feedback d-block" v-if="error('language_id') !== null">
        {{ error('language_id') }}
      </div>
    </div>
    <div class="form-group">
      <label :for="inputId('date-format')" class="form-label">{{ $t('date_format') }}</label>
      <select :id="inputId('date-format')" class="form-select" :aria-label="$t('select_date_format')" v-model="form.date_format">
        <option :value="null"></option>
        <option :value="format" v-for="(format) in dateFormats">{{ useDateFormat(new Date(), format).value }}</option>
      </select>
      <div class="invalid-feedback d-block" v-if="error('date_format') !== null">
        {{ error('date_format') }}
      </div>
    </div>
    <div class="form-group">
      <label :for="inputId('time-format')" class="form-label">{{ $t('time_format') }}</label>
      <select :id="inputId('time-format')" class="form-select" :aria-label="$t('select_time_format')" v-model="form.time_format">
        <option :value="null"></option>
        <option :value="format" v-for="(format) in timeFormats">{{ useDateFormat(new Date(), format).value }}</option>
      </select>
      <div class="invalid-feedback d-block" v-if="error('time_format') !== null">
        {{ error('time_format') }}
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
    <div class="form-group">
      <h6>
        {{ $t('roles') }}
        <required-input />
      </h6>
      <div class="form-check" v-for="role in roles">
        <input
          type="checkbox"
          :id="inputId(role.name)"
          class="form-check-input"
          :value="role.name"
          v-model="userRoles"
        />
        <label :for="inputId(role.name)" class="form-check-label">{{ $t(role.name) }}</label>
      </div>
      <div class="invalid-feedback d-block" v-if="error('roles') !== null">
        {{ error('roles') }}
      </div>
    </div>
    <div class="form-group mb-0">
      <h6>
        {{ $t('permissions') }}
        <required-input v-if="requiresPermissions" />
      </h6>
      <div class="form-text mb-2" v-html="$t('messages.form_text_user_permissions')"></div>
      <div class="checkboxes-permissions" v-if="groupedPermissions && Object.keys(groupedPermissions).length > 0">
        <div class="form-group" v-for="(groups, key) in groupedPermissions">
          <a href="/users" class="d-inline-block small text-secondary mb-1" :title="$t('toggle_group')" @click.prevent="toggleGroup(key.toString())">
            {{ $t(key.toString()) }}
            <i class="mdi mdi-checkbox-multiple-marked-circle"></i>
          </a>
          <template v-for="permission in groups">
            <div class="form-check">
              <input
                type="checkbox"
                :id="inputId(permission.name)"
                class="form-check-input"
                :value="permission.name"
                :disabled="!requiresPermissions"
                v-model="userPermissions"
              />
              <label :for="inputId(permission.name)" class="form-check-label">{{ $t(action(permission)) }}</label>
            </div>
          </template>
        </div>
        <div class="invalid-feedback d-block" v-if="error('permissions') !== null">
          {{ error('permissions') }}
        </div>
      </div>      
    </div>
  </form>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import type { IUser } from '@/types'
// Vars
const emits = defineEmits(['created'])
const fields = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  language_id: null,
  date_format: null,
  time_format: null,
  active: 1
}
const form = reactive<Partial<IUser>>({...fields})
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('user-create')
const { 
  userRoles,
  userPermissions,
  languages,
  dateFormats,
  timeFormats,
  requiresPermissions,
  toggleGroup
} = useFormUser()
const { inputType, inputIcon, toggleInput } = usePassword()
const { grouped: groupedPermissions, action } = usePermission()
const { roles } = useRole()
const { $_ } = useNuxtApp()
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  $_.forOwn(form, (value: any, key: string): void => {
    if ( ! $_.isNil(value)) {
      formData.append(key, value)
    }
  })
  $_.forEach(userRoles.value, (name: string): void => {
    formData.append('roles[]', name)
  })
  $_.forEach(userPermissions.value, (name: string): void => {
    formData.append('permissions[]', name)
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
  Object.assign(form, fields)
  userRoles.value = ['user']
  userPermissions.value = []
  clearErrors()
}
defineExpose({ reset, store })
</script>