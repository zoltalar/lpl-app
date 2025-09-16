<template v-if="message">
  <tabs id="tabs-message-view">
    <tab :title="$t('general')" target="#message-general" active />
    <tab :title="$t('format')" target="#message-format" />
    <tab :title="$t('attachments')" target="#message-attachments" v-if="allowAttachments" />
    <tab :title="$t('mailing_lists')" target="#message-mailing-lists" />
    <tab :title="$t('criteria')" target="#message-criteria" />
    <tab :title="$t('analytics')" target="#message-analytics" />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="message-general" role="tabpanel" aria-labelledby="tab-general">
      <div class="table-responsive">
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
                {{ $t('text_message') }}
              </td>
              <td>
                <span v-if="message.message_text">
                  <code>{{ message.message_text }}</code>
                </span>
                <span v-else> - </span>
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
                {{ $t('status') }}
              </td>
              <td>
                <message-status :status="message.status" />
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
    <div class="tab-pane fade" id="message-format" role="tabpanel" aria-labelledby="tab-format">
      <div class="table-responsive">
        <table class="table table-sm table-view mb-0">
          <tbody>
            <tr>
              <td class="table-attribute">
                {{ $t('send_as') }}
              </td>
              <td>
                <span v-if="message.send_format">
                  {{ message.send_format }}
                </span>
                <span v-else> - </span>
              </td>
            </tr>
            <tr>
              <td class="table-attribute">
                {{ $t('use_template') }}
              </td>
              <td>
                <span v-if="message.template">
                  {{ message.template.name }}
                </span>
                <span v-else> - </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tab-pane fade" id="message-attachments" role="tabpanel" aria-labelledby="tab-attachments">
      <div class="table-responsive">
        <table class="table table-sm table-view mb-0">
          <tbody>
            <template v-if="message.attachments && message.attachments.length > 0">
              <tr v-for="attachment in message.attachments">
                <td>
                  {{ attachment.name }}
                  <small class="text-secondary ms-1">
                    <span>.{{ extension(attachment.file) }}</span>;
                    <span v-if="attachment.size">{{ formatBytes(attachment.size) }}</span>                    
                  </small>
                </td>
              </tr>
            </template>
            <template v-else>
              <div class="text-center">
                <p class="mt-3 mb-0">{{ $t('no_attachments') }}</p>
              </div>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tab-pane fade" id="message-mailing-lists" role="tabpanel" aria-labelledby="tab-mailing-lists">
      <div class="table-responsive">
        <table class="table table-sm table-view mb-0">
          <tbody>
            <template v-if="message.mailing_lists && message.mailing_lists.length > 0">
              <tr v-for="list in message.mailing_lists">
                <td>{{ list.name }}</td>
              </tr>
            </template>
            <template v-else>
              <div class="text-center">
                <p class="mt-3 mb-0">{{ $t('no_mailing_lists') }}</p>
              </div>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tab-pane fade" id="message-criteria" role="tabpanel" aria-labelledby="tab-criteria">
      <div class="table-responsive">
        <table class="table table-sm table-view mb-0">
          <tbody>
            <tr>
              <td class="table-attribute">
                {{ $t('criteria_enabled') }}
              </td>
              <td>
                <yes-no :expression="message.criteria" />
              </td>
            </tr>
            <tr>
              <td class="table-attribute">
                {{ $t('conditions') }}
              </td>
              <td>
                <span v-if="message.conditions && message.conditions.length > 0">
                  <template v-for="(group, i) in message.conditions">
                    <span> ( </span>
                    <template v-for="(condition, j) in group">
                      <span v-if="validCondition(condition)">
                        {{ condition.slug }}
                        {{ condition.operator }}
                        {{ condition.value }}
                      </span>
                      <span v-if="j < (group.length - 1)">
                        <span class="badge text-bg-secondary ms-2 me-2">{{ $t('and') }}</span>
                      </span>
                    </template>
                    <span> ) </span>
                    <p class="mb-0" v-if="i < (message.conditions.length - 1)">
                      <span class="badge text-bg-success">{{ $t('or') }}</span>
                    </p>
                  </template>
                </span>
                <span v-else> - </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tab-pane fade" id="message-analytics" role="tabpanel" aria-labelledby="tab-analytics">
      <div class="table-responsive">
        <table class="table table-sm table-view mb-0">
          <tbody>
            <tr>
              <td class="table-attribute">
                {{ $t('analytics_enabled') }}
              </td>
              <td>
                <yes-no :expression="message.analytics" />
              </td>
            </tr>
            <template v-for="(item, key) in message.utm">
              <tr>
                <td class="table-attribute">
                  {{ $t('messages.' + key) }}
                </td>
                <td>
                  <span v-if="item">{{ item }}</span>
                  <span v-else> - </span>
                </td>
              </tr>
            </template>            
          </tbody>
        </table>
      </div>
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
const { extension, formatBytes } = useFile()
const {
  findBySlug: configurationFindBySlug,
  value: configurationValue
} = useConfiguration()
const { validCondition } = useMessage()
const { dateTimeFormat, fullName } = useUser()
// Computed
const allowAttachments = computed<number>(() => {
  return Number(configurationValue(toRaw(configurationFindBySlug('allow_attachments'))))
})
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