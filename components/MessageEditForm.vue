<template>
  <form class="form-default" @submit.prevent="update">
    <tabs id="tabs-message-edit">
      <tab :title="$t('meta')" target="#message-edit-meta" active />
      <tab :title="$t('content')" target="#message-edit-content" />
      <tab :title="$t('format')" target="#message-edit-format" />
      <tab :title="$t('mailing_lists')" target="#message-edit-mailing-lists" />
    </tabs>
    <div class="tab-content py-3">
      <div class="tab-pane fade show active" id="message-edit-meta" role="tabpanel" aria-labelledby="tab-meta">
        <div class="form-group mb-0">
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
          <div class="form-text" v-else>
            {{ $t('messages.form_text_message_name') }}
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="message-edit-content" role="tabpanel" aria-labelledby="tab-content">
        <div class="form-group">
          <label :for="inputId('subject')" class="form-label">{{ $t('subject') }}</label>
          <required-input />
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': error('subject') !== null}"
            :id="inputId('subject')"
            maxlength="255"
            v-model="form.subject"
          />
          <div class="invalid-feedback d-block" v-if="error('subject') !== null">
            {{ error('subject') }}
          </div>
          <div class="form-text" v-else>
            {{ $t('messages.form_text_message_subject') }}
          </div>
        </div>
        <div class="form-group">
          <label :for="inputId('from-field')" class="form-label">{{ $t('from_line') }}</label>
          <required-input />
          <help :content="$t('messages.help_message_from_field')" />
          <input
            type="text"
            class="form-control"
            :class="{'is-invalid': error('from_field') !== null}"
            :id="inputId('from-field')"
            maxlength="255"
            v-model="form.from_field"
          />
          <div class="invalid-feedback d-block" v-if="error('from_field') !== null">
            {{ error('from_field') }}
          </div>
        </div>
        <div class="form-group">
          <div class="float-end">
            <button type="button" class="btn btn-sm" :title="$t('toggle_editor')" @click.prevent="toggleEditor(inputId('editor-message-html'), form.message_html)">
              <i class="mdi mdi-language-html5"></i>
            </button>
          </div>
          <label :for="inputId('message-html')" class="form-label">{{ $t('html_message') }}</label>
          <required-input />
          <editor
            :id="inputId('editor-message-html')"
            v-model="form.message_html"
            v-if="renderEditor(inputId('editor-message-html'))"
          />
          <textarea class="form-control" :id="inputId('message-html')" rows="20" v-model="form.message_html" v-else></textarea>
          <div class="invalid-feedback d-block" v-if="error('message_html') !== null">
            {{ error('message_html') }}
          </div>
        </div>
        <div class="form-group">
          <div class="float-end">
            <button type="button" class="btn btn-sm" :title="$t('toggle_editor')" @click.prevent="toggleEditor(inputId('editor-footer'), form.footer)">
              <i class="mdi mdi-language-html5"></i>
            </button>
          </div>
          <label :for="inputId('footer')" class="form-label">{{ $t('footer') }}</label>
          <editor
            :id="inputId('editor-footer')"
            height="12rem"
            v-model="form.footer"
            v-if="renderEditor(inputId('editor-footer'))"
          />
          <textarea class="form-control" :id="inputId('footer')" rows="10" v-model="form.footer" v-else></textarea>
          <div class="invalid-feedback d-block" v-if="error('footer') !== null">
            {{ error('footer') }}
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IMessage } from '@/types'
// Vars
interface Props {
  message?: IMessage | null
}
const props = defineProps<Props>()
const emits = defineEmits(['updated'])
const fields = {
  name: '',
  subject: '',
  from_field: '',
  message_html: '',
  message_text: '',
  footer: ''
}
const form = reactive<Partial<IMessage>>({...fields})
// Composables
const {
  errors,
  error,
  getErrors,
  inputId
} = useForm('message-edit')
const { registerEditor, renderEditor, toggleEditor } = useEditor()
const { $_ } = useNuxtApp()
// Computed
const message = computed<IMessage>(() => {
  return props.message as IMessage
})
// Watch
watch(message, () => {
  if (message.value) {
    Object.assign(form, message.value)
  }
}, { immediate: true })
// Functions
const activeTab = (): string => {
  const nodes: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('#tabs-message-edit a.active')
  if (nodes.length > 0) {
    return $_.kebabCase(nodes[0].text)
  }
  return ''
}
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
  const list: FormData = normalize()
  const tab = activeTab()
  await useApi(`/admin/messages/update/${message.value.id}/${tab}`, {
    method: 'post',
    body: list,
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
  registerEditor(inputId('editor-message-html'))
  registerEditor(inputId('editor-footer'))
})
// Expose
defineExpose({ update })
</script>