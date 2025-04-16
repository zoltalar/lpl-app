<template v-if="page">
  <tabs>
    <tab :title="$t('general')" target="#subscribe-page-general" active />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="subscribe-page-general" role="tabpanel" aria-labelledby="tab-general">
      <table class="table table-sm table-view mb-0">
        <tbody>
          <tr>
            <td class="table-attribute">
              {{ $t('id') }}
            </td>
            <td>
              <code>{{ page.id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('name') }}
            </td>
            <td>
              <span v-if="page.name">
                {{ page.name }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('language') }}
            </td>
            <td>
              <span v-if="page.language">
                {{ page.language.name }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('introduction') }}
            </td>
            <td>
              <span v-if="page.intro">
                <code v-html="page.intro"></code>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              "{{ $t('thank_you') }}" {{ $t('text') }}
            </td>
            <td>
              <span v-if="page.thank_you">
                <code v-html="page.thank_you"></code>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('button_text') }}
            </td>
            <td>
              <span v-if="page.button">
                {{ page.button }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('email_format') }}
            </td>
            <td>
              <span v-if="page.email_format">
                {{ emailFormat(page.email_format) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('active') }}
            </td>
            <td>
              <yes-no :expression="page.active" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_at') }}
            </td>
            <td>
              <span v-if="page.created_at">
                {{ useDateFormat(page.created_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_at') }}
            </td>
            <td>
              <span v-if="page.updated_at">
                {{ useDateFormat(page.updated_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_by') }}
            </td>
            <td>
              <span v-if="page.creator">
                {{ fullName(page.creator, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_by') }}
            </td>
            <td>
              <span v-if="page.updater">
                {{ fullName(page.updater, true) }}
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
import type { ISubscribePage, IUser } from '@/types'
// Vars
interface Props {
  page?: ISubscribePage | null
}
const props = defineProps<Props>()
// Composables
const { data } = useAuth()
const { emailFormat } = useSubscribePage()
const { dateTimeFormat, fullName } = useUser()
// Computed
const page = computed<ISubscribePage>(() => {
  return props.page as ISubscribePage
})
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
</script>