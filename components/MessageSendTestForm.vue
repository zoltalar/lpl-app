<template>
  <form class="form-default" @submit.prevent="send">
    <div class="form-group">
      <label :for="inputId('subscribers')" class="form-label">{{ $t('subscribers') }}</label>
      <required-input />
      <v-select
        :id="inputId('subscribers')"
        :filterable="false"
        :multiple="true"
        :options="subscriberOptions"
        @search="onSubscriberSearch"
      >
        <template #option="option">
          {{ option['label'] }}
        </template>
        <template #selected-option="option">
          {{ option['label'] }}
        </template>
      </v-select>
      <div class="form-text">
        {{ $t('messages.form_text_message_subscribers_send_test') }}
      </div>
    </div>
    <div class="form-group" v-if="lists && lists.length > 0">
      <label :for="inputId('proof-lists')" class="form-label">{{ $t('proof_lists') }}</label>
      <div class="list-group list-group-horizontal">
        <a href="#" class="list-group-item" v-for="list in lists">{{ list.name }}</a>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { ISubscriber, TVSelectOption } from '@/types'
// Vars
const subscriberOptions = ref<TVSelectOption[]>([])
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('message-send-test')
const { lists } = useMailingList()
const { toVSelect: subscriberToVSelect } = useSubscriber()
const { $_ } = useNuxtApp()
// Functions
const fetchSubscribers = $_.debounce(async (search: string): Promise<void> => {
  await useApi('/admin/subscribers/search', {
    params: { search },
    onResponse({ request, response, options }) {
      if (response._data.data) {
        subscriberOptions.value = transform(response._data.data)
      }
    },
    onResponseError({ request, response, options }) {
      subscriberOptions.value = []
    }
  })
}, 250)
const onSubscriberSearch = (search: string) => {
  if (search.length && search.length >= 2) {
    fetchSubscribers(search)
  }
}
const transform = (subscribers: ISubscriber[]): TVSelectOption[] => {
  return subscribers.map((subscriber: ISubscriber) => {
    return subscriberToVSelect(subscriber)
  })
}
</script>