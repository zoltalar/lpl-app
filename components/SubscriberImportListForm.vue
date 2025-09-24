<template>
  <form novalidate @submit.prevent="process">
    <div class="form-group">
      <label :for="inputId('emails')" class="form-label">{{ $t('email_addresses') }}</label>
      <required-input />
      <textarea
        class="form-control"
        :class="{'is-invalid': error('emails') !== null}"
        :id="inputId('emails')"
        rows="10"
        aria-describedby="subscriber-import-list-text-emails"
        v-model="form.emails"
      ></textarea>
      <div class="invalid-feedback d-block" v-if="error('emails') !== null">
        {{ error('emails') }}
      </div>
      <div id="subscriber-import-list-text-emails" class="form-text" v-html="$t('messages.form_text_subscriber_import_emails')" v-else></div>
    </div>
    <div class="form-group">
      <h6 class="mb-0">
        <span>{{ $t('defaults') }}</span>
      </h6>
      <div class="form-text mb-2" v-html="$t('messages.form_text_subscriber_import_defaults')"></div>
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('html-email')"
          class="form-check-input"
          :true-value="1"
          :false-value="0"
          v-model="form.html_email"
        />
        <label :for="inputId('html-email')" class="form-check-label">{{ $t('html_email') }}</label>
      </div>
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('confirmed')"
          class="form-check-input"
          :true-value="1"
          :false-value="0"
          v-model="form.confirmed"
        />
        <label :for="inputId('confirmed')" class="form-check-label">{{ $t('confirmed') }}</label>
      </div>
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('blacklisted')"
          class="form-check-input"
          :true-value="1"
          :false-value="0"
          v-model="form.blacklisted"
        />
        <label :for="inputId('blacklisted')" class="form-check-label">{{ $t('blacklisted') }}</label>
      </div>
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('active')"
          class="form-check-input"
          :true-value="1"
          :false-value="0"
          v-model="form.active"
        />
        <label :for="inputId('active')" class="form-check-label">{{ $t('active') }}</label>
      </div>
    </div>
    <div class="form-group mb-0">
      <h6 class="mb-0">
        <span>{{ $t('mailing_lists') }}</span>
        <button type="button" class="btn btn-secondary btn-xs ms-2" :title="$t('refresh')" @click.prevent="refreshLists">
          <i class="mdi mdi-sync" :class="{'mdi-spin': busyRefreshLists}"></i>
        </button>
      </h6>
      <div class="form-text mb-2" v-html="$t('messages.form_text_subscriber_import_mailing_lists')"></div>
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
import type { TSubscriberImportList } from '@/types'
// Vars
const emits = defineEmits(['processed', 'errors'])
const fields = {
  emails: '',
  html_email: 1,
  confirmed: 1,
  blacklisted: 0,
  active: 1
}
const form = reactive<TSubscriberImportList>({...fields})
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('subscriber-import-list')
const {
  busyRefreshLists,
  lists,
  subscriberLists,
  listType,
  refreshLists
} = useFormSubscriberImport()
const { $_ } = useNuxtApp()
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  $_.forOwn(form, (value: any, key: string): void => {
    formData.append(key, value ?? '')
  })
  $_.forEach(subscriberLists.value, (id: any): void => {
    formData.append('lists[]', id.toString())
  })
  return formData
}
const process = async (): Promise<void> => {
  const formData: FormData = normalize()
  await useApi('/admin/subscribers/import-list', {
    method: 'post',
    body: formData,
    onResponse({ response }) {
      if (response?._data?.errors) {
        errors.value = getErrors(response._data.errors)
        emits('errors', toRaw(errors.value))
      } else if (response.status === 204) {
        reset()
        emits('processed')
      }
    }
  })
}
const reset = () => {
  Object.assign(form, fields)
  subscriberLists.value = []
  clearErrors()
}
defineExpose({ process, reset })
</script>