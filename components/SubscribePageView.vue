<template v-if="page">
  <div class="alert alert-danger text-center" role="alert" v-if="page.active !== 1">
    {{ $t('messages.subscribe_page_inactive') }}
  </div>
  <tabs id="tabs-subscribe-page-view">
    <tab :title="$t('general')" target="#subscribe-page-general" active />
    <tab :title="$t('attributes')" target="#subscribe-page-attributes" />
    <tab :title="$t('mailing_lists')" target="#subscribe-page-mailing-lists" />
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
    <div class="tab-pane fade" id="subscribe-page-attributes" role="tabpanel" aria-labelledby="tab-attributes">
      <ul class="mb-0" v-if="page.attributes && page.attributes.length > 0">
        <li v-for="attribute in page.attributes ">{{ attributeLabel(attribute) }}</li>
      </ul>
      <p class="text-center mt-3 mb-0" v-else>{{ $t('no_attributes') }}</p>
    </div>
    <div class="tab-pane fade" id="subscribe-page-mailing-lists" role="tabpanel" aria-labelledby="tab-mailing-lists">
      <ul class="mb-0" v-if="page.mailing_lists && page.mailing_lists.length > 0">
        <li v-for="list in page.mailing_lists ">{{ list.name }}</li>
      </ul>
      <p class="text-center mt-3 mb-0" v-else>{{ $t('no_mailing_lists') }}</p>
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
const { label: attributeLabel } = useAttribute()
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