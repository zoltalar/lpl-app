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
      ></textarea>
      <div class="invalid-feedback d-block" v-if="error('description') !== null">
        {{ error('description') }}
      </div>
    </div>
    <div class="form-group">
      <label :for="inputId('list-order')" class="form-label">{{ $t('list_order') }}</label>
      <input
        type="number"
        class="form-control"
        :class="{'is-invalid': error('list_order') !== null}"
        :id="inputId('list-order')"
        v-model="form.list_order"
      />
      <div class="invalid-feedback d-block" v-if="error('list_order') !== null">
        {{ error('list_order') }}
      </div>
    </div>
    <div class="form-group">
      <label :for="inputId('type')" class="form-label">{{ $t('type') }}</label>
      <required-input />
      <select
        class="form-select"
        :class="{'is-invalid': error('type') !== null}"
        :id="inputId('type')"
        :aria-label="$t('select_type')"
        v-model="form.type"
      >
        <option :value="null"></option>
        <option :value="type" v-for="(name, type) in types">{{ name }}</option>
      </select>
      <div class="invalid-feedback d-block" v-if="error('type') !== null">
        {{ error('type') }}
      </div>
    </div>
    <div class="form-group">
      <div class="form-check form-switch">
        <input
          type="checkbox"
          :id="inputId('active')"
          class="form-check-input"
          aria-describedby="mailing-list-edit-text-active"
          :true-value="1"
          :false-value="0"
          v-model="form.active"
        />
        <label :for="inputId('active')" class="form-check-label">{{ $t('active') }}</label>
      </div>
      <div id="mailing-list-edit-text-active" class="form-text">{{ $t('messages.form_text_mailing_list_active') }}</div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IMailingList } from '@/types'
// Vars
interface Props {
  list: IMailingList | null
}
const props = defineProps<Props>()
const emits = defineEmits(['updated', 'errors'])
const fields = {
  name: '',
  description: '',
  list_order: 0,
  type: null,
  active: 1
}
const form = reactive<Partial<IMailingList>>({...fields})
// Composables
const {
  errors,
  error,
  getErrors,
  inputId
} = useForm('mailing-list-edit')
const { types } = useFormMailingList()
const { $_ } = useNuxtApp()
// Computed
const list = computed<IMailingList>(() => {
  return props.list as IMailingList
})
// Watch
watch(list, () => {
  if (list.value) {
    Object.assign(form, list.value)
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
const update = async (): Promise<void> => {
  const listData: FormData = normalize()
  await useApi(`/admin/mailing-lists/update/${list.value.id}`, {
    method: 'post',
    body: listData,
    onResponse({ response }) {
      if (response?._data?.errors) {
        errors.value = getErrors(response._data.errors)
        emits('errors', toRaw(errors.value))
      } else if (response?._data?.data) {
        emits('updated')
      }
    }
  })
}
defineExpose({ update })
</script>