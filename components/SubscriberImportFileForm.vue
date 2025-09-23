<template>
  <form class="form-default" @submit.prevent="process">
    <div class="form-group">
      <label :for="inputId('file')" class="form-label">{{ $t('file') }}</label>
      <required-input />
      <input
        type="file"
        :id="inputId('file')"
        class="form-control"
        :class="{'is-invalid': error('file') !== null}"
        aria-describedby="subscriber-import-file-text-file"
        ref="inputFile"
        @change="onFileChange"
      />
      <div class="invalid-feedback d-block" v-if="error('file') !== null">
        {{ error('file') }}
      </div>
      <div id="subscriber-import-file-text-file" class="form-text" v-html="$t('messages.form_text_subscriber_import_file')"></div>
    </div>
    <div class="form-group">
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('confirmed')"
          class="form-check-input"
          aria-describedby="subscriber-import-file-text-confirmed"
          :true-value="1"
          :false-value="0"
          v-model="form.confirmed"
        />
        <label :for="inputId('confirmed')" class="form-check-label">{{ $t('confirm_emails') }}</label>
      </div>
      <div id="text-confirmed" class="form-text" v-html="$t('messages.form_text_subscriber_import_confirmed')"></div>
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
import type { TSubscriberImportFile } from '@/types'
// Vars
const emits = defineEmits(['processed', 'errors'])
const fields = {
  confirmed: 1
}
const form = reactive<TSubscriberImportFile>({...fields})
const file = ref<File|null>(null)
const inputFile = useTemplateRef<HTMLInputElement>('inputFile')
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('subscriber-import-file')
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
  if (file.value) {
    formData.append('file', file.value)
  }
  $_.forEach(subscriberLists.value, (id: any): void => {
    formData.append('lists[]', id.toString())
  })
  return formData
}
const onFileChange = (event: Event): void => {
  const el = event.target as HTMLInputElement
  if (el.files) {
    file.value = el.files[0]
  }
}
const process = async (): Promise<void> => {
  const formData: FormData = normalize()
  await useApi('/admin/subscribers/import-file', {
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
  file.value = null
  if (inputFile.value) {
    inputFile.value.value = ''
  }
  clearErrors()
}
defineExpose({ process, reset })
</script>