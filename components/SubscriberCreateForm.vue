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
      <div id="text-html-email" class="form-text" v-html="$t('messages.form_text_subscriber_html_email')"></div>
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
      <div id="text-confirmed" class="form-text" v-html="$t('messages.form_text_subscriber_confirmed')"></div>
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
      <div id="text-blacklisted" class="form-text" v-html="$t('messages.form_text_subscriber_blacklisted')"></div>
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
      <div id="text-active" class="form-text">{{ $t('messages.form_text_subscriber_active') }}</div>
    </div>
    <div class="form-group mb-0">
      <h6>
        <span>{{ $t('attributes') }}</span>
        <button type="button" class="btn btn-secondary btn-xs ms-2" :title="$t('refresh')" @click.prevent="refreshAttributes">
          <i class="mdi mdi-sync" :class="{'mdi-spin': busyRefreshAttributes}"></i>
        </button>
      </h6>
    </div>
    <template v-for="attribute in attributes">
      <div class="form-group">
        <attribute-label
          :attribute="attribute"
          prefix="subscriber-create"
        />
        <attribute-input
          :attribute="attribute"
          prefix="subscriber-create"
          :errored="error('attributes.' + attribute.slug) !== null"
          :disabled="busyRefreshAttributes"
          v-model="subscriberAttributes[attribute.slug]"
        />
        <div class="invalid-feedback d-block" v-if="error('attributes.' + attribute.slug) !== null">
          {{ error('attributes.' + attribute.slug) }}
        </div>
      </div>
    </template>
    <div class="form-group mb-0">
      <h6 class="mb-0">
        <span>{{ $t('mailing_lists') }}</span>
        <button type="button" class="btn btn-secondary btn-xs ms-2" :title="$t('refresh')" @click.prevent="refreshLists">
          <i class="mdi mdi-sync" :class="{'mdi-spin': busyRefreshLists}"></i>
        </button>
      </h6>
      <div class="form-text mb-2" v-html="$t('messages.form_text_subscriber_mailing_lists')"></div>
      <div class="checkboxes-mailing-lists" v-if="lists.length > 0">
        <template v-for="list in lists">
          <div class="form-check">
            <input
              type="checkbox"
              :id="inputId('mailing-list-' + list.id)"
              class="form-check-input"
              :value="list.id"
              :disabled="busyRefreshLists"
              v-model="subscriberLists"
            />
            <label :for="inputId('mailing-list-' + list.id)" class="form-check-label">
              {{ list.name }}
              <small class="text-secondary ms-1">
                <span v-if="list.type">{{ listType(list.type) }}</span>; {{ list.subscribers_count }} {{ $t('subscriber_s') }}
              </small>
            </label>
          </div>
        </template>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { ISubscriber } from '@/types'
// Vars
const emits = defineEmits(['created', 'errors'])
const fields = {
  email: '',
  password: '',
  html_email: 1,
  confirmed: 0,
  blacklisted: 0,
  active: 1
}
const form = reactive<Partial<ISubscriber>>({...fields})
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('subscriber-create')
const {
  attributes,
  subscriberAttributes,
  subscriberLists,
  busyRefreshAttributes,
  busyRefreshLists,
  lists,
  inputType,
  inputIcon,
  normalizeAttributeValue,
  refreshAttributes,
  refreshLists,
  toggleInput,
  listType
} = useFormSubscriber()
const { $_ } = useNuxtApp()
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  $_.forOwn(form, (value: any, key: string): void => {
    if ( ! $_.isNil(value)) {
      formData.append(key, value)
    }
  })
  if (! $_.isEmpty(subscriberAttributes.value)) {
    $_.forOwn(subscriberAttributes.value, (value: any, key: string) => {
      formData.append('attributes[' + key + ']', normalizeAttributeValue(value))
    })
  }
  $_.forEach(subscriberLists.value, (id: any): void => {
    formData.append('lists[]', id.toString())
  })
  return formData
}
const store = async (): Promise<void> => {
  const subscriber: FormData = normalize()
  await useApi('/admin/subscribers/store', {
    method: 'post',
    body: subscriber,
    onResponse({ response }) {
      if (response?._data?.errors) {
        errors.value = getErrors(response._data.errors)
        emits('errors', toRaw(errors.value))
      } else if (response?._data?.data) {
        reset()
        emits('created')
      }
    }
  })
}
const reset = () => {
  Object.assign(form, fields)
  subscriberAttributes.value = {}
  subscriberLists.value = []
  clearErrors()
}
defineExpose({ reset, store })
</script>