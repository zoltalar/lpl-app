<template>
  <form class="form-default" @submit.prevent="store">
    <div class="row">
      <div class="col-lg-6">
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
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('language-id')" class="form-label">{{ $t('language') }}</label>
          <select
            :id="inputId('language-id')"
            class="form-select"
            :disabled="languages.length === 0"
            v-model="form.language_id"
          >
            <option :value="null"></option>
            <option :value="language.id" v-for="language in languages">{{ language.name }}</option>
          </select>
          <div class="invalid-feedback d-block" v-if="error('language_id') !== null">
            {{ error('language_id') }}
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('intro')" class="form-label">{{ $t('introduction') }}</label>
          <textarea
            class="form-control"
            :class="{'is-invalid': error('intro') !== null}"
            :id="inputId('intro')"
            rows="7"
            v-model="form.intro"
          ></textarea>
          <div class="invalid-feedback d-block" v-if="error('intro') !== null">
            {{ error('intro') }}
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('thank-you')" class="form-label">"{{ $t('thank_you') }}" {{ $t('text') }}</label>
          <textarea
            class="form-control"
            :class="{'is-invalid': error('thank_you') !== null}"
            :id="inputId('thank_you')"
            rows="7"
            v-model="form.thank_you"
          ></textarea>
          <div class="invalid-feedback d-block" v-if="error('thank_you') !== null">
            {{ error('thank_you') }}
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('button')" class="form-label">{{ $t('button_text') }}</label>
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': error('button') !== null}"
            :id="inputId('button')"
            maxlength="255"
            v-model="form.button"
          />
          <div class="invalid-feedback d-block" v-if="error('button') !== null">
            {{ error('button') }}
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="form-group">
          <label :for="inputId('email-format')" class="form-label">{{ $t('email_format') }}</label>
          <required-input />
          <select
            class="form-select"
            :class="{'is-invalid': error('email_format') !== null}"
            :id="inputId('email-format')"
            :aria-label="$t('select_email_format')"
            v-model="form.email_format"
          >
            <option :value="null"></option>
            <option :value="type" v-for="(name, type) in emailFormats">{{ name }}</option>
          </select>
          <div class="invalid-feedback d-block" v-if="error('email_format') !== null">
            {{ error('email_format') }}
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="form-group mb-0">
          <div class="form-check form-switch">
            <input
              type="checkbox"
              :id="inputId('active')"
              class="form-check-input"
              :true-value="1"
              :false-value="0"
              v-model="form.active"
            >
            <label :for="inputId('active')" class="form-check-label">{{ $t('active') }}</label>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="form-group mb-0">
          <h6>
            <span>{{ $t('offer_mailing_lists') }}</span>
            <button type="button" class="btn btn-secondary btn-sm ms-2" :title="$t('refresh')" @click.prevent="refreshLists">
              <i class="mdi mdi-sync" :class="{'mdi-spin': busyRefreshLists}"></i>
            </button>
          </h6>
          <div class="form-text mb-2" v-html="$t('messages.form_text_subscribe_page_mailing_lists')"></div>
          <div class="checkboxes-mailing-lists" v-if="lists.length > 0">
            <template v-for="list in lists">
              <div class="form-check">
                <input
                  type="checkbox"
                  :id="inputId('mailing-list-' + list.id)"
                  class="form-check-input"
                  :value="list.id"
                  :disabled="busyRefreshLists"
                  v-model="pageLists"
                />
                <label :for="inputId('mailing-list-' + list.id)" class="form-check-label">
                  {{ list.name }}
                </label>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { ISubscribePage } from '@/types'
// Vars
const emits = defineEmits(['created'])
const fields = {
  name: '',
  language_id: null,
  intro: '',
  thank_you: '',
  button: '',
  email_format: 'radio_html',
  confirm_email: 0,
  active: 1
}
const form: Partial<ISubscribePage> = reactive({...fields})
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('subscribe-page-create')
const {
  pageLists,
  languages,
  emailFormats,
  busyRefreshLists,
  lists,
  refreshLists
} = useFormSubscribePage()
const { $_ } = useNuxtApp()
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  $_.forOwn(form, (value: any, key: string): void => {
    if ( ! $_.isNil(value)) {
      formData.append(key, value)
    }
  })
  $_.forEach(pageLists.value, (id: any): void => {
    formData.append('lists[]', id.toString())
  })
  return formData
}
const store = async () => {
  const page: FormData = normalize()
  await useApi('/admin/subscribe-pages/store', {
    method: 'post',
    body: page,
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