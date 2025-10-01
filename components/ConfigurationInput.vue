<template>
  <div class="input-configuration">
    <input
      type="text"
      :id="props.inputId"
      class="form-control"
      :class="{'is-invalid': props.errored}"
      maxlength="255"
      :disabled="props.disabled"
      v-model="model"
      v-if="configuration.type === 'text'"
    />
    <textarea
      class="form-control"
      :class="{'is-invalid': props.errored}"
      :id="inputId"
      :required="required"
      :disabled="props.disabled"
      rows="10"
      v-model="model"
      v-else-if="['textarea', 'wysiwyg'].includes(configuration.type)"
    ></textarea>
    <input
      type="number"
      :id="props.inputId"
      class="form-control"
      :class="{'is-invalid': props.errored}"
      :disabled="props.disabled"
      v-model="model"
      v-if="configuration.type === 'number'"
    />
    <select
      :id="props.inputId"
      class="form-select"
      :class="{'is-invalid': props.errored}"
      :disabled="props.disabled"
      v-model="model"
      v-else-if="configuration.type === 'bool'"
    >
      <option></option>
      <option :value="1">{{ $t('enabled') }}</option>
      <option :value="0">{{ $t('disabled') }}</option>
    </select>
    <select
      :id="props.inputId"
      class="form-select"
      :class="{'is-invalid': props.errored}"
      :disabled="props.disabled"
      v-model="model"
      v-else-if="configuration.type === 'enum_templates'"
    >
      <option></option>
      <option :value="template.id" v-for="template in templates">{{ template.name }}</option>
    </select>
  </div>
</template>
<script setup lang="ts">
import type { IConfiguration } from '@/types'
// Vars
interface Props {
  configuration?: IConfiguration,
  inputId: string,
  modelValue?: string | number | null,
  errored?: boolean,
  disabled?: boolean,
}
const props = withDefaults(defineProps<Props>(), {
  inputId: '',
  errored: false,
  disabled: false
})
const model = defineModel<string | undefined>({
  required: true
})
// Composables
const { inputId } = useForm()
const { templates } = useTemplate()
// Computed
const configuration = computed<IConfiguration>(() => {
  return props.configuration as IConfiguration
})
</script>