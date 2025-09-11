<template>
  <form class="form-default" @submit.prevent="send">
    <div class="form-group">
      <label :for="inputId('subscribers')" class="form-label">{{ $t('subscribers') }}</label>
      <required-input />
      <div class="spinner-border spinner-border-sm ms-2" role="status" v-if="busyFetchSubscribers">
        <span class="visually-hidden">{{ $t('loading') }}...</span>
      </div>
      <v-select
        :id="inputId('subscribers')"
        :filterable="false"
        :multiple="true"
        :options="subscriberOptions"
        @search="onSubscriberSearch"
        v-model="subscribers"
      >
        <template #option="option">
          {{ option['label'] }}
        </template>
        <template #selected-option="option">
          {{ option['label'] }}
        </template>
      </v-select>
      <div class="invalid-feedback d-block" v-if="error('subscribers') !== null">
        {{ error('subscribers') }}
      </div>
      <div class="form-text" v-else>
        {{ $t('messages.form_text_message_subscribers_send_test') }}
      </div>
    </div>
    <div class="form-group" v-if="lists && lists.length > 0">
      <label :for="inputId('proof-lists')" class="form-label">{{ $t('proof_lists') }}</label>
      <button type="button" class="btn btn-secondary btn-xs ms-2" :title="$t('refresh')" @click.prevent="refreshLists">
        <i class="mdi mdi-sync" :class="{'mdi-spin': busyRefreshLists}"></i>
      </button>
      <ul class="list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="list in lists">
          <a :href="'/mailing-lists/' + $_.kebabCase(list.name)" @click.prevent="fetchSubscribersByMailingListId(list.id)">{{ list.name }}</a>
          <span class="badge badge-primary rounded-pill" v-if="list.subscribers_confirmed_unblacklisted_count !== undefined">
            {{ list.subscribers_confirmed_unblacklisted_count }}
          </span>
        </li>
      </ul>
      <div class="form-text">
        {{ $t('messages.form_text_message_proof_lists') }}
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IMailingList, IMessage, ISubscriber, TVSelectOption } from '@/types'
// Vars
interface Props {
  message?: IMessage | null
}
const props = defineProps<Props>()
const emits = defineEmits(['sent', 'errors'])
const subscribers = ref<TVSelectOption[]>([])
const subscriberOptions = ref<TVSelectOption[]>([])
const busyFetchSubscribers = ref<boolean>(false)
// Composables
const {
  errors,
  clearErrors,
  error,
  getErrors,
  inputId
} = useForm('message-send-test')
const {
  busy: busyRefreshLists,
  lists: unalteredLists,
  refresh: refreshLists
} = useMailingList()
const { toVSelect: subscriberToVSelect } = useSubscriber()
const { $_ } = useNuxtApp()
// Computed
const lists = computed<IMailingList[]>(() => {
  const lists = unalteredLists.value.filter((list: IMailingList) => {
    return list.type === 'proof' && list.active === 1
  })
  return $_.sortBy(lists, ['list_order', 'name'])
})
const message = computed<IMessage>(() => {
  return props.message as IMessage
})
// Functions
const fetchSubscriberOptions = $_.debounce(async (search: string): Promise<void> => {
  busyFetchSubscribers.value = true
  await useApi('/admin/subscribers/search', {
    params: { search },
    onResponse({ response }) {
      busyFetchSubscribers.value = false
      subscriberOptions.value = []
      if (response._data.data) {
        subscriberOptions.value = transform(response._data.data)
      }
    }
  })
}, 250)
const fetchSubscribersByMailingListId = async (id: number): Promise<void> => {
  busyFetchSubscribers.value = true
  await useApi('/admin/subscribers/search', {
    params: { mailing_list_id: id },
    onResponse({ response }) {
      busyFetchSubscribers.value = false
      subscribers.value = []
      if (response._data.data) {
        subscribers.value = transform(response._data.data)
      }
    }
  })
}
const normalize = (): FormData => {
  const formData: FormData = new FormData()
  subscribers.value.forEach((option: TVSelectOption) => {
    formData.append('subscribers[]', option.label)
  })
  return formData
}
const onSubscriberSearch = (search: string) => {
  if (search.length && search.length >= 2) {
    fetchSubscriberOptions(search)
  }
}
const send = async () => {
  const messageData: FormData = normalize()
  await useApi(`/admin/messages/test/${message.value.id}`, {
    method: 'post',
    body: messageData,
    onResponse({ response }) {
      if (response._data.errors) {
        errors.value = getErrors(response._data.errors)
        emits('errors', toRaw(errors.value))
      } else if (response._data.data) {
        emits('sent')
      }
    }
  })
}
const transform = (subscribers: ISubscriber[]): TVSelectOption[] => {
  return subscribers.map((subscriber: ISubscriber) => {
    return subscriberToVSelect(subscriber)
  })
}
// Expose
defineExpose({ send })
</script>