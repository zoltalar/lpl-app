<template>
  <form class="form-default" @submit.prevent="update">
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
          />
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
          />
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
    </div>
  </form>
</template>
<script setup lang="ts">
import type { ISubscribePage } from '@/types'
// Vars
interface Props {
  page?: ISubscribePage | null
}
const props = defineProps<Props>()
const emits = defineEmits(['updated'])
const fields = {
  name: '',
  language_id: null,
  intro: '',
  thank_you: '',
  button: '',
  email_format: null,
  confirm_email: 0,
  active: 0
}
const form: Partial<ISubscribePage> = reactive({...fields})
// Composables
const {
  errors,
  error,
  getErrors,
  inputId
} = useForm('subscribe-page-edit')
const { languages, emailFormats } = useFormSubscribePage()
const { $_ } = useNuxtApp()
// Computed
const page = computed<ISubscribePage>(() => {
  return props.page as ISubscribePage
})
// Watch
watch(page, () => {
  if (page.value) {
    Object.assign(form, page.value)
  }
}, { immediate: true })
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  formData.append('_method', 'put')
  $_.forOwn(form, (value: any, key: string): void => {
    if ( ! $_.isNil(value)) {
      formData.append(key, value)
    }
  })
  return formData
}
const update = async () => {
  const pageData: FormData = normalize()
  await useApi(`/admin/subscribe-pages/update/${page.value.id}`, {
    method: 'post',
    body: pageData,
    onResponse({ request, response, options }) {
      if (response._data.errors) {
        errors.value = getErrors(response._data.errors)
      } else if (response._data.data) {
        emits('updated')
      }
    },
    onResponseError({ request, response, options }) {
      errors.value = getErrors(response._data.errors)
    }
  })
}
defineExpose({ update })
</script>