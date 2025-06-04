<template>
  <form class="form-default" @submit.prevent="store">
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
    <div class="form-group">
      <label :for="inputId('description')" class="form-label">{{ $t('description') }}</label>
      <textarea
        class="form-control"
        :class="{'is-invalid': error('description') !== null}"
        :id="inputId('description')"
        rows="7"
        v-model="form.description"
      ></textarea>
      <div class="invalid-feedback d-block" v-if="error('description') !== null">
        {{ error('description') }}
      </div>
    </div>
    <div class="form-group">
      <label :for="inputId('file')" class="form-label">{{ $t('file') }}</label>
      <required-input />
      <input
        type="file"
        :id="inputId('file')"
        class="form-control"
        :class="{'is-invalid': error('file') !== null}"
        ref="inputFile"
        @change="onFileChange"
      />
      <div class="invalid-feedback d-block" v-if="error('file') !== null">
        {{ error('file') }}
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IAttachment } from '@/types'
// Vars
const emits = defineEmits(['created'])
const fields = {
  name: '',
  description: ''
}
const form = reactive<Partial<IAttachment>>({...fields})
const file = ref<File|null>(null)
const inputFile = useTemplateRef<HTMLInputElement>('inputFile')
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('attachment-create')
const { fileName } = useFile()
const { $_ } = useNuxtApp()
// Watch
watch(file, () => {
  if (file.value instanceof File && form.name === '') {
    form.name = fileName(file.value.name)
  }
})
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  $_.forOwn(form, (value: any, key: string): void => {
    if ( ! $_.isNil(value)) {
      formData.append(key, value)
    }
  })
  if (file.value) {
    formData.append('file', file.value)
  }
  return formData
}
const onFileChange = (event: Event): void => {
  const el = event.target as HTMLInputElement
  if (el.files) {
    file.value = el.files[0]
  }
}
const store = async () => {
  const attachment: FormData = normalize()
  await useApi('/admin/attachments/store', {
    method: 'post',
    body: attachment,
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
  file.value = null
  if (inputFile.value) {
    inputFile.value.value = ''
  }
  clearErrors()
}
defineExpose({ reset, store })
</script>