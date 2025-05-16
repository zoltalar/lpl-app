<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('draft_messages') }}</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row toolbar">
              <div class="col-md-7 col-lg-8">
                <div class="btn-group" role="group" :aria-label="$t('message_options')">
                  <button type="button" class="btn btn-primary" v-if="hasRole('admin') || can('message-create')">{{ $t('create') }}</button>
                  <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin') || can('template-view')">{{ $t('refresh') }}</button>
                </div>
                <div class="spinner-border spinner-border-sm ms-3" role="status" v-if="busy">
                  <span class="visually-hidden">{{ $t('loading') }}...</span>
                </div>
              </div>
              <div class="col-md-5 col-lg-4">
                <search-form
                  class="mt-3 mt-sm-0"
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
                      <th width="10%">
                        <sortable-column column="messages.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="50%">
                        <sortable-column column="messages.name" v-model="sort">{{ $t('name') }}</sortable-column>
                      </th>
                      <th class="text-end">{{ $t('actions') }}</th>
                    </tr>
                    <transition name="fade">
                      <tr v-if="toggleFilters">
                        <th>
                          <filter-input v-model="filters.id" />
                        </th>
                        <th>
                          <filter-input v-model="filters.name" />
                        </th>
                        <th class="text-end">
                          -
                        </th>
                      </tr>
                    </transition>                    
                  </thead>
                  <tbody>
                    <tr v-for="message in messages">
                      <td>{{ message.id }}</td>
                      <td>
                        <span class="text-truncate d-block" :title="message.name" style="width: 400px;">
                          {{ message.name }}
                        </span>
                      </td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button type="button" class="btn btn-light" :title="$t('edit')" @click.prevent="edit(message)" v-if="hasRole('admin') || can('message-edit')"><i class="mdi mdi-pencil"></i></button>
                          <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(message)" v-if="hasRole('admin') || can('message-view')"><i class="mdi mdi-eye-outline"></i></button>
                          <button type="button" class="btn btn-danger" :title="$t('delete')" @click.prevent="destroy(message)" v-if="hasRole('admin') || can('message-delete')"><i class="mdi mdi-close"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="messages && messages.length === 0">
                      <td colspan="3">
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
  </div>
</template>
<script setup lang="ts">
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
const toggleFilters = ref<boolean>(false)
const selectedMessage = ref<IMessage>({} as IMessage)
// Composables
const { t } = useI18n()
const { messages: toastMessages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { can } = usePermission()
const { refresh: refreshConfigurations } = useConfiguration()
const { $bootstrap } = useNuxtApp()
// Computed
const messages = computed<IMessage[]>(() => {
  return resource?.value?.data as IMessage[]
})
// Functions
const destroy = async (message: IMessage) => {
  const name = message.name
  const model = t('message')
  const confirmMessage = t('messages.confirm_destroy_name', { name })
  if (confirm(confirmMessage)) {
    await useApi(`/admin/messages/${message.id}`, {
      method: 'delete',
      onResponse({ request, response, options }) {
        if (response.status === 204) {
          refresh()
          addToast({
            header: t('success'),
            body: t('messages.model_destroyed', { model })
          })
        } else {
          addToast({
            header: t('error'),
            body: t('messages.model_name_destroy_error', { model, name }),
            type: 'danger'
          })
        }
      },
    })
  }
}
onMounted(() => {
  refresh()
})
</script>