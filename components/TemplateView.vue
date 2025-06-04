<template v-if="template">
  <tabs id="tabs-template-view">
    <tab :title="$t('general')" target="#template-general" active />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="template-general" role="tabpanel" aria-labelledby="tab-general">
      <table class="table table-sm table-view mb-0">
        <tbody>
          <tr>
            <td class="table-attribute">
              {{ $t('id') }}
            </td>
            <td>
              <code>{{ template.id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('name') }}
            </td>
            <td>
              <span v-if="template.name">
                {{ template.name }}                
              </span>
              <span v-else> - </span>              
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('default') }}?
            </td>
            <td>
              <yes-no :expression="template.id === defaultTemplateId"/>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('html_content') }}
            </td>
            <td>
              <span v-if="template.content_html">
                <code>{{ template.content_html }}</code>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('text_content') }}
            </td>
            <td>
              <span v-if="template.content_text">
                <code>{{ template.content_text }}</code>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_at') }}
            </td>
            <td>
              <span v-if="template.created_at">
                {{ useDateFormat(template.created_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_at') }}
            </td>
            <td>
              <span v-if="template.updated_at">
                {{ useDateFormat(template.updated_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_by') }}
            </td>
            <td>
              <span v-if="template.creator">
                {{ fullName(template.creator, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_by') }}
            </td>
            <td>
              <span v-if="template.updater">
                {{ fullName(template.updater, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import type { ITemplate, IUser } from '@/types'
// Vars
interface Props {
  template?: ITemplate | null
}
const props = defineProps<Props>()
// Composables
const { data } = useAuth()
const {
  findBySlug: configurationFindBySlug,
  value: configurationValue
} = useConfiguration()
const { dateTimeFormat, fullName } = useUser()
// Computed
const defaultTemplateId = computed<number>(() => {
  return Number(configurationValue(toRaw(configurationFindBySlug('default-template'))))
})
const template = computed<ITemplate>(() => {
  return props.template as ITemplate
})
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
</script>