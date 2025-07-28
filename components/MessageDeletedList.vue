<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('deleted_messages') }}</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row toolbar">
              <div class="col-md-7 col-lg-8">
                <!-- mobile options -->
                <div class="d-inline-block d-md-none">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-message-options" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ $t('options') }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-message-options">
                      <li><a href="/messages/draft" class="dropdown-item" @click.prevent="create" v-if="hasRole('admin') || can('message-create')">{{ $t('create') }}</a></li>
                      <li><a href="/messages/draft" class="dropdown-item" @click.prevent="refresh" v-if="hasRole('admin') || can('message-view')">{{ $t('refresh') }}</a></li>
                      <li><a href="/messages/draft" class="dropdown-item" :class="{'disabled': selected.length === 0}" @click.prevent="softDeleteBatch" v-if="hasRole('admin') || can('message-delete')">{{ $t('delete') }}</a></li>
                    </ul>
                  </div>
                </div>
                <!-- desktop options -->
                <div class="d-inline-block d-none d-md-inline-block">
                  <div class="btn-group" role="group" :aria-label="$t('message_options')">
                    <button type="button" class="btn btn-primary" @click.prevent="create" v-if="hasRole('admin') || can('message-create')">{{ $t('create') }}</button>
                    <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin') || can('message-view')">{{ $t('refresh') }}</button>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{{ $t('bulk_actions') }}</button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li><a href="/messages/draft" class="dropdown-item" :class="{'disabled': selected.length === 0}" @click.prevent="softDeleteBatch" v-if="hasRole('admin') || can('message-delete')">{{ $t('delete') }}</a></li>
                      </ul>
                    </div>
                  </div>                  
                </div>
                <div class="spinner-border spinner-border-sm ms-3" role="status" v-if="busy">
                  <span class="visually-hidden">{{ $t('loading') }}...</span>
                </div>
              </div>
              <div class="col-md-5 col-lg-4">
                <search-form
                  class="mt-3 mt-md-0"
                  v-model="search"
                >
                  <button
                    type="button"
                    class="btn"
                    :class="{'btn-secondary': !toggleFilters, 'btn-primary': toggleFilters}"
                    :title="$t('toggle_filters')"
                    :aria-label="$t('toggle_filters')"
                    @click.prevent="toggleFilters = !toggleFilters"
                  >
                    <i class="mdi mdi-filter-menu-outline"></i>
                  </button>
                </search-form>
              </div>
            </div>
            <div class="table-responsive">
              <form class="form-default">
                <table class="table table-hover table-list">
                  <thead>
                    <tr>
                      <th width="1%">
                        <input
                          type="checkbox"
                          id="input-employees-toggle"
                          class="form-check-input"
                          :disabled="messages.length === 0"
                          v-model="toggle"
                        />
                      </th>
                      <th width="10%">
                        <sortable-column column="messages.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="25%">
                        <sortable-column column="messages.name" v-model="sort">{{ $t('name') }}</sortable-column>
                      </th>
                      <th width="25%">
                        <sortable-column column="messages.subject" v-model="sort">{{ $t('subject') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="messages.created_at" v-model="sort">{{ $t('created_at') }}</sortable-column>
                      </th>
                      <th class="text-end">{{ $t('actions') }}</th>
                    </tr>
                    <transition name="fade">
                      <tr v-if="toggleFilters">
                        <th class="text-center">
                          -
                        </th>
                        <th>
                          <filter-input :disabled="busy" v-model="filters.id" />
                        </th>
                        <th>
                          <filter-input :disabled="busy" v-model="filters.name" />
                        </th>
                        <th>
                          <filter-input :disabled="busy" v-model="filters.subject" />
                        </th>
                        <th>
                          -
                        </th>
                        <th class="text-end">
                          -
                        </th>
                      </tr>
                    </transition>                    
                  </thead>
                  <tbody>
                    <template v-for="message in messages">
                      <tr :class="{'table-active': selected.includes(message.id) }">
                        <td>
                          <input
                            type="checkbox"
                            class="form-check-input"
                            :value="message.id"
                            number
                            v-model="selected"
                          />
                        </td>
                        <td>{{ message.id }}</td>
                        <td>
                          <span v-if="message.name">
                            <span class="text-truncate d-block" :title="message.name" style="width: 300px;">
                              {{ message.name }}
                            </span>
                          </span>
                          <span v-else> - </span>
                        </td>
                        <td>
                          <span v-if="message.subject">
                            <span class="text-truncate d-block" :title="message.subject" style="width: 300px;">
                              {{ message.subject }}
                            </span>
                          </span>
                          <span v-else> - </span>
                        </td>
                        <td>
                          <span v-if="message.created_at">
                            {{ useDateFormat(message.created_at, dateTimeFormat(currentUser)) }}
                          </span>
                          <span v-else> - </span>
                        </td>
                        <td class="text-end">
                          <div class="btn-group btn-group-sm">
                            <button type="button" class="btn btn-light" :title="$t('edit')" @click.prevent="edit(message)" v-if="hasRole('admin') || can('message-edit')"><i class="mdi mdi-pencil"></i></button>
                            <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(message)" v-if="hasRole('admin') || can('message-view')"><i class="mdi mdi-eye-outline"></i></button>
                            <button type="button" class="btn btn-warning" :title="$t('undelete')" @click.prevent="undelete(message)" v-if="hasRole('admin') || can('message-undelete')"><i class="mdi mdi-undo-variant"></i></button>
                            <button type="button" class="btn btn-danger" :title="$t('purge')" @click.prevent="purge(message)" v-if="hasRole('admin') || can('message-purge')"><i class="mdi mdi-close"></i></button>
                          </div>
                        </td>
                      </tr>                      
                    </template>
                    <tr v-if="messages && messages.length === 0">
                      <td colspan="6">
                        {{ $t('messages.no_messages') }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>              
            </div>
            <div class="row">
              <div class="col-lg-5">
                <pagination :meta="meta" class="mt-3" v-model="page" />
              </div>
              <div class="col-lg-3">
                <page-size class="mt-0 mt-lg-3 mb-3" v-model="limit" />
              </div>
              <div class="col-sm-4">
                <div class="mt-0 mt-lg-4 text-start text-lg-end">
                  {{ info }}
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
    <toasts :messages="toastMessages" />
    <modal
      id="modal-message-edit"
      :title="$t('edit_message')"
      size="xl"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <message-edit-form
        :message="selectedMessage"
        ref="formMessageEdit"
        @updated="handleUpdated"
        @errors="handleErrors"
      />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-outline-primary" @click.prevent="updateWithoutClosing">{{ $t('save') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="update">{{ $t('save_and_close') }}</button>
      </template>
    </modal>
    <modal
      id="modal-message-view"
      :title="$t('message_details')"
      size="xl"
    >
      <message-view :message="selectedMessage" />
    </modal> 
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { IMessage, IUser } from '@/types'
// Vars
const props = defineProps({
  endpoint: { type: String }
})
const {
  busy,
  resource,
  search,
  filters,
  sort,
  meta,
  page,
  limit,
  info,
  refresh
} = useDataTable(props)
const selected = ref<number[]>([])
const toggleFilters = ref<boolean>(false)
const formMessageEdit = useTemplateRef<HTMLFormElement>('formMessageEdit')
const selectedMessage = ref<IMessage>({} as IMessage)
// Composables
const { t } = useI18n()
const { messages: toastMessages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { can } = usePermission()
const { data } = useAuth()
const { dateTimeFormat } = useUser()
const { $bootstrap } = useNuxtApp()
// Computed
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
const messages = computed<IMessage[]>(() => {
  return resource?.value?.data as IMessage[]
})
const toggle = computed<boolean>({
  get: () => {
    return messages.value ? messages.value.length === selected.value.length : false
  },
  set: (value) => {
    const checked: number[] = []
    if (value) {
      messages.value.forEach((message: IMessage) => {
        checked.push(message.id)
      })
    }
    selected.value = checked
  }
})
// Functions
const create = async () => {
  const model = t('the_message')
  await useApi('/admin/messages/store', {
    method: 'post',
    onResponse({ request, response, options }) {
      if (response._data.data) {
        refresh()
        addToast({ 
          header: t('success'),
          body: t('messages.model_created', { model })
        })
      }
    }
  })
}
const edit = (message: IMessage): void => {
  selectedMessage.value = message
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-message-edit')
  modal.show()
}
const handleUpdated = (close: boolean): void => {
  onUpdated(close)
}
const handleErrors = (errors: Record<string,string>): void => {
  onErrors(errors)
}
const onErrors = (errors: Record<string,string>): void => {
  addToast({ 
    header: t('failure'),
    body: t('messages.form_errors', { count: Object.keys(errors).length }),
    type: 'danger'
  })
}
const onUpdated = (close: boolean) => {
  if (close) {
    const modal = $bootstrap.Modal.getOrCreateInstance('#modal-message-edit')
    modal.hide()
  }
  const model = t('message')
  refresh()
  addToast({ 
    header: t('success'),
    body: t('messages.model_updated', { model })
  })
}
const show = (message: IMessage): void => {
  selectedMessage.value = message
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-message-view')
  modal.show()
}
const softDelete = async (message: IMessage): Promise<void> => {
  const name = message.name
  const model = t('the_message')
  const confirmMessage = t('messages.confirm_delete_name', { name })
  if (confirm(confirmMessage)) {
    await useApi(`/admin/messages/soft-delete/${message.id}`, {
      method: 'delete',
      onResponse({ request, response, options }) {
        if (response.status === 204) {
          refresh()
          addToast({
            header: t('success'),
            body: t('messages.model_deleted', { model })
          })
        } else {
          addToast({
            header: t('error'),
            body: t('messages.model_name_delete_error', { model, name }),
            type: 'danger'
          })
        }
      },
    })
  }
}
const softDeleteBatch = async (): Promise<void> => {
  let models = t('the_messages').toLowerCase()
  let message = t('messages.confirm_delete_batch_models', { models })
  if (confirm(message)) {
    await useApi(`/admin/messages/soft-batch-delete`, {
      method: 'post',
      body: {
        ids: selected.value
      },
      onResponse({ request, response, options }) {        
        if (response.status === 204) {
          selected.value = []
          models = t('the_messages')
          refresh()
          addToast({
            header: t('success'),
            body: t('messages.models_deleted', { models })
          })
        }
      },
    })
  }
}
const update = (): void => {
  formMessageEdit.value?.update()
}
const updateWithoutClosing = (): void => {
  formMessageEdit.value?.update(false)
}
onMounted(() => {
  refresh()
})
</script>