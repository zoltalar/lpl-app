<template>
  <form class="form-default" @submit.prevent="update">
    <div class="form-group">
      <label :for="inputId('slug')" class="form-label">{{ $t('slug') }}</label>
      <input
        type="text"
        class="form-control"
        :id="inputId('slug')"
        :value="configuration?.slug"
        maxlength="255"
        readonly
      />
    </div>
    <div class="form-group mb-0">
      <label :for="inputId('value')" class="form-label">{{ $t('value') }}</label>
      <configuration-input
        :configuration="configuration"
        :inputId="inputId('value')"
        :errored="error('value') !== null"
        v-model="form.value"
      />
      <div class="invalid-feedback d-block" v-if="error('value') !== null">
        {{ error('value') }}
      </div>
      <div class="form-text" v-html="configuration?.description" v-else></div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IConfiguration } from '@/types'
// Vars
interface Props {
  configuration?: IConfiguration | null
}
const props = defineProps<Props>()
const emits = defineEmits(['updated', 'errors'])
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('configuration-edit')
const { form } = useFormConfiguration()
const { $_ } = useNuxtApp()
// Computed
const configuration = computed<IConfiguration>(() => {
  return props.configuration as IConfiguration
})
// Watch
watch(configuration, () => {
  if (configuration.value) {
    Object.assign(form, configuration.value)
  }
}, { immediate: true })
// Functions
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  formData.append('_method', 'put')
  $_.forOwn(form, (value: any, key: string): void => {
    formData.append(key, value ?? '')
  })
  return formData
}
const reset = (): void => {
  clearErrors()
}
const update = async (): Promise<void> => {
  const configurationData: FormData = normalize()
  await useApi(`/admin/configurations/update/${configuration.value.id}`, {
    method: 'post',
    body: configurationData,
    onResponse({ response }) {
      if (response?._data?.errors) {
        errors.value = getErrors(response._data.errors)
        emits('errors', toRaw(errors.value))
      } else if (response?._data?.data) {
        reset()
        emits('updated')
      }
    }
  })
}
// Expose
defineExpose({ update })
</script>