<template>
  <div class="alert alert-danger text-center" role="alert" v-if="subscriber.blacklisted === 1">
    {{ $t('messages.subscriber_blacklisted') }}
  </div>
  <tabs id="tabs-subscriber-view">
    <tab
      :title="$t('general')"
      target="#subscriber-general"
      active
      @selected="handleSelected"
    />
    <tab
      :title="$t('attributes')"
      target="#subscriber-attributes"
      @selected="handleSelected"
    />
    <tab
      :title="$t('mailing_lists')"
      target="#subscriber-lists"
      @selected="handleSelected"
    />
    <tab
      :title="$t('activity')"
      target="#subscriber-history"
      @selected="handleSelected"
    />
    <tab
      :title="$t('the_messages')"
      target="#subscriber-messages"
      @selected="handleSelected"
    />
    <tab
      :title="$t('bounces')"
      target="#subscriber-bounces"
      @selected="handleSelected"
    />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="subscriber-general" role="tabpanel" aria-labelledby="tab-general">
      <table class="table table-sm table-view mb-0">
        <tbody>
          <tr>
            <td class="table-attribute">
              {{ $t('id') }}
            </td>
            <td>
              {{ subscriber.id }}
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('email') }}
            </td>
            <td>
              {{ subscriber.email }}
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('password_set?') }}
            </td>
            <td>
              <yes-no :expression="subscriber.password_set" :inverse="true" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('html_email') }}
            </td>
            <td>
              <yes-no :expression="subscriber.html_email" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('confirmed') }}
            </td>
            <td>
              <yes-no :expression="subscriber.confirmed" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('blacklisted') }}
            </td>
            <td>
              <yes-no :expression="subscriber.blacklisted" :inverse="true" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('active') }}
            </td>
            <td>
              <yes-no :expression="subscriber.active" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('bounce_count') }}
            </td>
            <td>
              {{ subscriber.bounce_count }}
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('unique_id') }}
            </td>
            <td>
              <code>{{ subscriber.unique_id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_at') }}
            </td>
            <td>
              <span v-if="subscriber.created_at">
                {{ useDateFormat(subscriber.created_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_at') }}
            </td>
            <td>
              <span v-if="subscriber.updated_at">
                {{ useDateFormat(subscriber.updated_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_by') }}
            </td>
            <td>
              <span v-if="subscriber.creator">
                {{ fullName(subscriber.creator, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_by') }}
            </td>
            <td>
              <span v-if="subscriber.updater">
                {{ fullName(subscriber.updater, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tab-pane fade" id="subscriber-attributes" role="tabpanel" aria-labelledby="tab-attributes">
      <div class="table-responsive">
        <table class="table table-sm table-view mb-0">
          <tbody>
            <template v-if="subscriber.subscriber_attributes && subscriber.subscriber_attributes.length > 0">
              <tr v-for="attribute in subscriber.subscriber_attributes">
                <td class="table-attribute">
                  {{ attributeLabel(attribute) }}
                </td>
                <td>
                  <span v-if="attribute.pivot && attribute.pivot.value">
                    {{ attribute.pivot.value }}
                  </span>
                  <span v-else> - </span>
                </td>
              </tr>
            </template>
            <template v-else>
              <div class="text-center">
                <p class="mt-3 mb-0">{{ $t('no_attributes') }}</p>
              </div>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="tab-pane fade" id="subscriber-history" role="tabpanel" aria-labelledby="tab-history">
      <div class="tab-pane-subscriber-history" v-if="subscriber.history && subscriber.history.length > 0">
        <div class="alert alert-warning text-center" role="alert">
          {{ $t('messages.subscriber_history_limit') }}
        </div>
        <div class="card border" :class="{'mb-3': (j < subscriber.history.length - 1)}" v-for="(entry, j) in subscriber.history">
          <div class="card-header">
            <span>{{ entry.summary }}</span>
          </div>
          <div class="card-body">
            <small>{{ $t('details') }}</small>
            <pre class="text-secondary" v-html="entry.details"></pre>
            <small>{{ $t('ip_address') }}</small>
            <pre class="text-secondary">{{ (entry?.info?.ip ?? '-') }}</pre>
            <small>{{ $t('user_agent') }}</small>
            <pre class="text-secondary">{{ (entry?.info?.ua ?? '-') }}</pre>
            <small>{{ $t('created_at') }}</small>
            <pre class="text-secondary mb-0">{{ useDateFormat(entry.created_at, dateTimeFormat(currentUser)) }}</pre>
          </div>
        </div>
      </div>
      <div class="text-center" v-else>
        <p class="mt-3 mb-0">{{ $t('no_activity') }}</p>
      </div>
    </div>
    <div class="tab-pane fade" id="subscriber-lists" role="tabpanel" aria-labelledby="tab-lists">
      <ul class="mb-0" v-if="subscriber.mailing_lists && subscriber.mailing_lists.length > 0">
        <li v-for="list in subscriber.mailing_lists">{{ list.name }}</li>
      </ul>
      <div class="text-center" v-else>
        <p class="mt-3 mb-0">{{ $t('no_mailing_lists') }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { ISubscriber, IUser } from '@/types'
// Vars
interface Props {
  subscriber?: ISubscriber | null
}
const props = defineProps<Props>()
const emits = defineEmits(['clearedHistory'])
const selectedTab = ref<string>('')
// Composables
const { t } = useI18n()
const { data } = useAuth()
const { label: attributeLabel } = useAttribute()
const { dateTimeFormat, fullName } = useUser()
// Computed
const subscriber = computed<ISubscriber>(() => {
  return props.subscriber as ISubscriber
})
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
// Functions
const clearHistory = async (): Promise<void> => {
  const message = t('messages.confirm_subscriber_history_clear')
  if (confirm(message)) {
    await useApi(`/admin/subscribers/clear-history/${subscriber.value.id}`, {
      method: 'post',
      onResponse({ response }) {
        if (response.status === 204) {
          emits('clearedHistory')
        }
      }
    })
  }
}
const handleSelected = (title: string): void => {
  selectedTab.value = title
}
// Expose
defineExpose({ selectedTab, clearHistory })
</script>