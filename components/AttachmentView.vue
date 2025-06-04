<template v-if="attachment">
  <tabs id="tabs-attachment-view">
    <tab :title="$t('general')" target="#attachment-general" active />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="attachment-general" role="tabpanel" aria-labelledby="tab-general">
      <table class="table table-sm table-view mb-0">
        <tbody>
          <tr>
            <td class="table-attribute">
              {{ $t('id') }}
            </td>
            <td>
              <code>{{ attachment.id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('name') }}
            </td>
            <td>
              <span v-if="attachment.name">
                {{ attachment.name }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('description') }}
            </td>
            <td>
              <span v-if="attachment.description">
                {{ attachment.description }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('file') }}
            </td>
            <td>
              <code>{{ attachment.file }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_at') }}
            </td>
            <td>
              <span v-if="attachment.created_at">
                {{ useDateFormat(attachment.created_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_at') }}
            </td>
            <td>
              <span v-if="attachment.updated_at">
                {{ useDateFormat(attachment.updated_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_by') }}
            </td>
            <td>
              <span v-if="attachment.creator">
                {{ fullName(attachment.creator, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_by') }}
            </td>
            <td>
              <span v-if="attachment.updater">
                {{ fullName(attachment.updater, true) }}
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
import type { IAttachment, IUser } from '@/types'
// Vars
interface Props {
  attachment?: IAttachment | null
}
const props = defineProps<Props>()
// Composables
const { data } = useAuth()
const { dateTimeFormat, fullName } = useUser()
// Computed
const attachment = computed<IAttachment>(() => {
  return props.attachment as IAttachment
})
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
</script>