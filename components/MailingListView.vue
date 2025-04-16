<template v-if="list">
  <tabs>
    <tab :title="$t('general')" target="#mailing-list-general" active />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="mailing-list-general" role="tabpanel" aria-labelledby="tab-general">
      <table class="table table-sm table-view mb-0">
        <tbody>
          <tr>
            <td class="table-attribute">
              {{ $t('id') }}
            </td>
            <td>
              <code>{{ list.id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('name') }}
            </td>
            <td>
              <span v-if="list.name">
                {{ list.name }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('description') }}
            </td>
            <td>
              <span v-if="list.description">
                {{ list.description }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('list_order') }}
            </td>
            <td>
              <span v-if="list.list_order !== null">
                {{ list.list_order }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('type') }}
            </td>
            <td>
              <span v-if="list.type">
                <mailing-list-type :type="list.type" />
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('active') }}
            </td>
            <td>
              <yes-no :expression="list.active" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_at') }}
            </td>
            <td>
              <span v-if="list.created_at">
                {{ useDateFormat(list.created_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_at') }}
            </td>
            <td>
              <span v-if="list.updated_at">
                {{ useDateFormat(list.updated_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_by') }}
            </td>
            <td>
              <span v-if="list.creator">
                {{ fullName(list.creator, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_by') }}
            </td>
            <td>
              <span v-if="list.updater">
                {{ fullName(list.updater, true) }}
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
import type { IMailingList, IUser } from '@/types'
// Vars
interface Props {
  list?: IMailingList | null
}
const props = defineProps<Props>()
// Composables
const { data } = useAuth()
const { dateTimeFormat, fullName } = useUser()
// Computed
const list = computed<IMailingList>(() => {
  return props.list as IMailingList
})
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
</script>