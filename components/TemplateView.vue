<template v-if="template">
  <tabs>
    <tab :title="$t('general')" target="#template-general" active />
    <tab :title="$t('placeholders')" target="#template-placeholders" />
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
              {{ $t('content') }}
            </td>
            <td>
              <span v-if="template.content">
                <code>{{ template.content }}</code>
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
    <div class="tab-pane fade" id="template-placeholders" role="tabpanel" aria-labelledby="tab-placeholders">
      <ul class="mb-0" v-if="template.placeholders && template.placeholders.length > 0">
        <li v-for="placeholder in template.placeholders">{{ format(placeholder.name) }}</li>
      </ul>
      <div class="text-center" v-else>
        <p class="mt-3 mb-0">{{ $t('no_placeholders') }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import type { IConfiguration, ITemplate, IUser } from '@/types'
// Vars
interface Props {
  template?: ITemplate | null
}
const props = defineProps<Props>()
// Composables
const { data } = useAuth()
const { findBySlug: configurationFindBySlug } = useConfiguration()
const { format } = usePlaceholder()
const { dateTimeFormat, fullName } = useUser()
// Computed
const defaultTemplate = computed<IConfiguration|undefined>(() => {
  return configurationFindBySlug('default-template')
})
const template = computed<ITemplate>(() => {
  return props.template as ITemplate
})
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
</script>