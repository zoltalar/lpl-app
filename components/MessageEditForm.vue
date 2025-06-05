<template>
  <form class="form-default" @submit.prevent="update">
    <tabs id="tabs-message-edit">
      <tab :title="$t('content')" target="#message-edit-content" active />
      <tab :title="$t('format')" target="#message-edit-format" />
      <tab :title="$t('mailing_lists')" target="#message-edit-mailing-lists" />
    </tabs>
    <div class="tab-content py-3">
      <div class="tab-pane fade show active" id="message-edit-content" role="tabpanel" aria-labelledby="tab-content">
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
  from_field: ''
}
const form = reactive<Partial<IMessage>>({...fields})
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('message-edit')
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
  const nodes: NodeList[] = document.querySelectorAll('#tabs-message-edit a.active')
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
defineExpose({ update })
</script>