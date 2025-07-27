<template v-if="message">
  <tabs id="tabs-message-view">
    <tab :title="$t('general')" target="#message-general" active />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="message-general" role="tabpanel" aria-labelledby="tab-general">
      <table class="table table-sm table-view mb-0">
        <tbody>
          <tr>
            <td class="table-attribute">
              {{ $t('id') }}
            </td>
            <td>
              <code>{{ message.id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('name') }}
            </td>
            <td>
              <span v-if="message.name">
                {{ message.name }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('subject') }}
            </td>
            <td>
              <span v-if="message.subject">
                {{ message.subject }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('from_line') }}
            </td>
            <td>
              <span v-if="message.from_field">
                {{ message.from_field }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('html_message') }}
            </td>
            <td>
              <div v-html="message.message_html" v-if="messageHtml"></div>
              <div v-else>
                <span v-if="message.message_html">
                  <code>{{ message.message_html }}</code>
                </span>
                <span v-else> - </span>
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  class="btn btn-sm"
                  :class="{'btn-primary': messageHtml, 'btn-secondary': !messageHtml}"
                  @click.prevent="toggleMessageHtml"
                >
                  <i class="mdi mdi-language-html5"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('footer') }}
            </td>
            <td>
              <div v-html="message.footer" v-if="footerHtml"></div>
              <div v-else>
                <span v-if="message.footer">
                  <code>{{ message.footer }}</code>
                </span>
                <span v-else> - </span>
              </div>
              <div class="mt-3">
                <button
                  type="button"
                  class="btn btn-sm"
                  :class="{'btn-primary': footerHtml, 'btn-secondary': !footerHtml}"
                  @click.prevent="toggleFooterHtml"
                >
                  <i class="mdi mdi-language-html5"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_at') }}
            </td>
            <td>
              <span v-if="message.created_at">
                {{ useDateFormat(message.created_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_at') }}
            </td>
            <td>
              <span v-if="message.updated_at">
                {{ useDateFormat(message.updated_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_by') }}
            </td>
            <td>
              <span v-if="message.creator">
                {{ fullName(message.creator, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_by') }}
            </td>
            <td>
              <span v-if="message.updater">
                {{ fullName(message.updater, true) }}
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
import type { IMessage, IUser } from '@/types'
// Vars
interface Props {
  message?: IMessage | null
}
const props = defineProps<Props>()
const messageHtml = ref<boolean>(false)
const footerHtml = ref<boolean>(false)
// Composables
const { data } = useAuth()
const { dateTimeFormat, fullName } = useUser()
// Computed
const message = computed<IMessage>(() => {
  return props.message as IMessage
})
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
// Functions
const toggleFooterHtml = (): void => {
  footerHtml.value = ! footerHtml.value
}
const toggleMessageHtml = (): void => {
  messageHtml.value = ! messageHtml.value
}
</script>