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
      <label :for="inputId('description')" class="form-label">{{ $t('description') }}</label>
      <textarea
        class="form-control"
        :class="{'is-invalid': error('description') !== null}"
        :id="inputId('description')"
        rows="7"
        v-model="form.description"
      />
      <div class="invalid-feedback d-block" v-if="error('description') !== null">
        {{ error('description') }}
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IAttachment } from '@/types'
// Vars
interface Props {
  attachment?: IAttachment | null
}
const props = defineProps<Props>()
const emits = defineEmits(['updated'])
const fields = {
  name: '',
  description: ''
}
const form: Partial<IAttachment> = reactive({...fields})
// Composables
const {
  errors,
  error,
  getErrors,
  inputId
} = useForm('attachment-edit')
const { $_ } = useNuxtApp()
// Computed
const attachment = computed<IAttachment>(() => {
  return props.attachment as IAttachment
})
// Watch
watch(attachment, () => {
  if (attachment.value) {
    Object.assign(form, $_.omit(attachment.value, ['file']))
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
  const attachmentData: FormData = normalize()
  await useApi(`/admin/attachments/update/${attachment.value.id}`, {
    method: 'post',
    body: attachmentData,
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