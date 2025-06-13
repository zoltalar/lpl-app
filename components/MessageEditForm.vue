<template>
  <form class="form-default" @submit.prevent="update(false)">
    <tabs id="tabs-message-edit">
      <tab :title="$t('meta')" target="#message-edit-meta" active />
      <tab :title="$t('content')" target="#message-edit-content" />
      <tab :title="$t('format')" target="#message-edit-format" />
      <tab :title="$t('attachments')" target="#message-edit-attachments" v-if="allowAttachments" />
      <tab :title="$t('mailing_lists')" target="#message-edit-mailing-lists" />
    </tabs>
    <div class="tab-content py-3">
      <!-- meta tab -->
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
      <!-- content tab -->
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
        <div class="form-group mb-0">
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
      <!-- format tab -->
      <div class="tab-pane fade" id="message-edit-format" role="tabpanel" aria-labelledby="tab-format">
        <div class="form-group">
          <label :for="inputId('send-format')" class="form-label">{{ $t('send_as') }}</label>
          <required-input />
          <select
            class="form-select"
            :id="inputId('send-format')"
            v-model="form.send_format"
          >
            <option :value="value" v-for="(format, value) in formats">{{ format }}</option>
          </select>
          <div class="invalid-feedback d-block" v-if="error('send_format') !== null">
            {{ error('send_format') }}
          </div>
        </div>
        <div class="form-group mb-0">
          <label :for="inputId('template-id')" class="form-label">{{ $t('use_template') }}</label>
          <div class="input-group">
            <select
              class="form-select"
              :id="inputId('template-id')"
              :disabled="busyRefreshTemplates"
              v-model="form.template_id"
            >
              <option :value="null"> - {{ $t('no_template') }} - </option>
              <option :value="template.id" v-for="template in templates">{{ template.name }}</option>
            </select>
            <button type="button" class="btn btn-secondary" :title="$t('refresh')" @click.prevent="refreshTemplates">
              <i class="mdi mdi-sync" :class="{'mdi-spin': busyRefreshTemplates}" />
            </button>
          </div>
        </div>
      </div>
      <!-- attachments tab -->
      <div class="tab-pane fade" id="message-edit-attachments" role="tabpanel" aria-labelledby="tab-attachments">
        <div class="form-group mb-0">
          <h6>
            <span>{{ $t('attachments') }}</span>
            <button type="button" class="btn btn-secondary btn-xs ms-2" :title="$t('refresh')" @click.prevent="refreshAttachments">
              <i class="mdi mdi-sync" :class="{'mdi-spin': busyRefreshAttachments}"></i>
            </button>
          </h6>
          <div class="form-text mb-2" v-html="$t('messages.form_text_message_attachments')"></div>
          <div class="checkboxes-attachments" v-if="attachments.length > 0">
            <template v-for="attachment in attachments">
              <div class="form-check">
                <input
                  type="checkbox"
                  :id="inputId('attachment-' + attachment.id)"
                  class="form-check-input"
                  :value="attachment.id"
                  :disabled="busyRefreshAttachments"
                  v-model="messageAttachments"
                />
                <label :for="inputId('attachment-' + attachment.id)" class="form-check-label">
                  {{ attachment.name }}
                  <small class="text-secondary ms-1">
                    <span>.{{ extension(attachment.file) }}</span>;
                    <span v-if="attachment.size">{{ formatBytes(attachment.size) }}</span>                    
                  </small>
                </label>
              </div>
            </template>            
          </div>
        </div>
      </div>
      <!-- mailing lists tab -->
      <div class="tab-pane fade" id="message-edit-mailing-lists" role="tabpanel" aria-labelledby="tab-mailing-lists">
        <div class="form-group mb-0">
          <h6>
            <span>{{ $t('mailing_lists') }}</span>
            <button type="button" class="btn btn-secondary btn-xs ms-2" :title="$t('refresh')" @click.prevent="refreshLists">
              <i class="mdi mdi-sync" :class="{'mdi-spin': busyRefreshLists}"></i>
            </button>
          </h6>
          <div class="form-text mb-2" v-html="$t('messages.form_text_message_mailing_lists')"></div>
          <div class="checkboxes-mailing-lists" v-if="lists.length > 0">
            <template v-for="list in lists">
              <div class="form-check">
                <input
                  type="checkbox"
                  :id="inputId('mailing-list-' + list.id)"
                  class="form-check-input"
                  :value="list.id"
                  :disabled="busyRefreshLists"
                  v-model="messageMailingLists"
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
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IAttachment, IMailingList, IMessage } from '@/types'
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
  footer: '',
  send_format: '',
  template_id: null
}
const form = reactive<Partial<IMessage>>({...fields})
const messageAttachments = ref<number[]>([])
const messageMailingLists = ref<number[]>([])
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('message-edit')
const {
  attachments,
  busy: busyRefreshAttachments,
  refresh: refreshAttachments
} = useAttachment()
const {
  findBySlug: configurationFindBySlug,
  value: configurationValue
} = useConfiguration()
const { registerEditor, renderEditor, toggleEditor } = useEditor()
const { extension, formatBytes } = useFile()
const {
  busy: busyRefreshLists,
  lists: unalteredList,
  refresh: refreshLists,
  type: listType
} = useMailingList()
const { formats } = useMessage()
const {
  busy: busyRefreshTemplates,
  refresh: refreshTemplates,
  templates
} = useTemplate()
const { $_ } = useNuxtApp()
// Computed
const allowAttachments = computed<number>(() => {
  return Number(configurationValue(toRaw(configurationFindBySlug('allow-attachments'))))
})
const lists = computed<IMailingList[]>(() => {
  return $_.sortBy(unalteredList.value, ['list_order', 'name'])
})
const message = computed<IMessage>(() => {
  return props.message as IMessage
})
// Watch
watch(message, () => {
  if (message.value) {
    Object.assign(form, message.value)
    messageAttachments.value = []
    if (message.value.attachments) {
      message.value.attachments.forEach((attachment: IAttachment) => {
        messageAttachments.value.push(attachment.id)
      })
    }
    messageMailingLists.value = []
    if (message.value.mailing_lists) {
      message.value.mailing_lists.forEach((list: IMailingList) => {
        messageMailingLists.value.push(list.id)
      })
    }
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
  $_.forEach(messageAttachments.value, (id: any): void => {
    formData.append('attachments[]', id.toString())
  })
  $_.forEach(messageMailingLists.value, (id: any): void => {
    formData.append('lists[]', id.toString())
  })
  return formData
}
const reset = (): void => {
  clearErrors()
}
const update = async (close: boolean = true) => {
  const list: FormData = normalize()
  const tab = activeTab()
  await useApi(`/admin/messages/update/${message.value.id}/${tab}`, {
    method: 'post',
    body: list,
    onResponse({ request, response, options }) {
      if (response._data.errors) {
        errors.value = getErrors(response._data.errors)
      } else if (response._data.data) {
        reset()
        emits('updated', close)
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