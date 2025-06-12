<template>
  <form class="form-default" @submit.prevent="update">
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
      <textarea class="form-control" :id="inputId('content-html')" rows="20" v-model="form.content_html" v-else></textarea>
      <div class="invalid-feedback d-block" v-if="error('content_html') !== null">
        {{ error('content_html') }}
      </div>
      <div class="form-text" v-html="$t('messages.form_text_template_content_html')" v-else></div>
    </div>
    <div class="form-group">
      <label :for="inputId('content-text')" class="form-label">{{ $t('text_content') }}</label>
      <required-input />
      <textarea class="form-control" :id="inputId('content-text')" rows="20" v-model="form.content_text"></textarea>
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
import type { ITemplate } from '@/types'
// Vars
interface Props {
  template?: ITemplate | null
}
const props = defineProps<Props>()
const emits = defineEmits(['updated'])
// Composables
const {
  errors,
  error,
  getErrors,
  inputId
} = useForm('template-edit')
const {
  form,
  options,
  registerEditor,
  renderEditor,
  toggleEditor
} = useFormTemplate()
const {
  findBySlug: configurationFindBySlug,
  value: configurationValue
} = useConfiguration()
const { $_ } = useNuxtApp()
// Computed
const template = computed<ITemplate>(() => {
  return props.template as ITemplate
})
// Watch
watch(template, () => {
  if (template.value) {
    Object.assign(form, template.value)
    const defaultTemplateId = Number(configurationValue(toRaw(configurationFindBySlug('default-template'))))
    if (template.value.id === defaultTemplateId) {
      options['default'] = 1
    } else {
      options['default'] = 0
    }
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
  $_.forOwn(options, (value: number, key: string): void => {
    formData.append('options[' + key + ']', value.toString())
  })
  return formData
}
const update = async () => {
  const templateData: FormData = normalize()
  await useApi(`/admin/templates/update/${template.value.id}`, {
    method: 'post',
    body: templateData,
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
// Hooks
onMounted(() => {
  registerEditor(inputId('editor-content-html'))
})
// Expose
defineExpose({ update })
</script>