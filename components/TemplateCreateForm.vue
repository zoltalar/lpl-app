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
      <div class="float-end">
        <button type="button" class="btn btn-sm" :title="$t('toggle_editor')" @click.prevent="toggleEditor(inputId('editor-content-html'), form.content_html)">
          <i class="mdi mdi-language-html5"></i>
        </button>
      </div>
      <label :for="inputId('content-html')" class="form-label">{{ $t('html_content') }}</label>
      <required-input />
      <editor :id="inputId('editor-content-html')" v-model="form.content_html" v-if="renderEditor(inputId('editor-content-html'))" />
      <textarea
        class="form-control"
        :class="{'is-invalid': error('content_html') !== null}"
        :id="inputId('content-html')"
        rows="20"
        v-model="form.content_html"
        v-else
      ></textarea>
      <div class="invalid-feedback d-block" v-if="error('content_html') !== null">
        {{ error('content_html') }}
      </div>
      <div class="form-text" v-html="$t('messages.form_text_template_content_html')" v-else></div>
    </div>
    <div class="form-group">
      <label :for="inputId('content-text')" class="form-label">{{ $t('text_content') }}</label>
      <required-input />
      <textarea
        class="form-control"
        :class="{'is-invalid': error('content_text') !== null}"
        :id="inputId('content-text')"
        rows="20"
        v-model="form.content_text"
      ></textarea>
      <div class="invalid-feedback d-block" v-if="error('content_text') !== null">
        {{ error('content_text') }}
      </div>
      <div class="form-text" v-html="$t('messages.form_text_template_content_text')" v-else></div>
    </div>
    <div class="form-group mb-0">
      <label class="form-label">{{ $t('set_as_default?') }}</label>
      <div class="form-check">
        <input
          type="checkbox"
          :id="inputId('option-default')"
          class="form-check-input"
          :true-value="1"
          :false-value="0"
          v-model="options.default"
        />
        <label :for="inputId('option-default')" class="form-check-label">
          {{ $t('yes') }}
        </label>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
// Vars
const emits = defineEmits(['created', 'errors'])
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('template-create')
const {
  fields,
  form,
  options,
  registerEditor,
  renderEditor,
  toggleEditor
} = useFormTemplate()
const { $_ } = useNuxtApp()
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  $_.forOwn(form, (value: any, key: string): void => {
    if ( ! $_.isNil(value)) {
      formData.append(key, value)
    }
  })
  $_.forOwn(options, (value: number, key: string): void => {
    formData.append('options[' + key + ']', value.toString())
  })
  return formData
}
const store = async (): Promise<void> => {
  const template: FormData = normalize()
  await useApi('/admin/templates/store', {
    method: 'post',
    body: template,
    onResponse({ response }) {
      if (response._data.errors) {
        errors.value = getErrors(response._data.errors)
        emits('errors', toRaw(errors.value))
      } else if (response._data.data) {
        reset()
        emits('created')
      }
    }
  })
}
const reset = () => {
  Object.assign(form, fields)
  clearErrors()
}
// Hooks
onMounted(() => {
  registerEditor(inputId('editor-content-html'))
})
// Expose
defineExpose({ reset, store })
</script>