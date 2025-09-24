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
      <div class="card border">
        <div class="card-header">
          {{ $t('sample') }}
        </div>
        <div class="card-body">
          <pre class="mb-0">"email","password","html_email","confirmed","blacklisted","active","first_name","last_name"
"subscriber@domain.com","welcome",1,1,0,1,"John","Smith"</pre>
        </div>
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
// Vars
const emits = defineEmits(['processed', 'errors'])
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
      } else if (response?._data?.file_name) {
        reset()
        emits('processed')
      }
    }
  })
}
const reset = () => {
  file.value = null
  if (inputFile.value) {
    inputFile.value.value = ''
  }
  clearErrors()
}
defineExpose({ process, reset })
</script>