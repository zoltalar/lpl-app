<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('subscribers') }}</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row toolbar">
              <div class="col-md-7 col-lg-8">
                <div class="btn-group" role="group" :aria-label="$t('subscriber_options')">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-subscriber-create">{{ $t('create') }}</button>
                  <button type="button" class="btn btn-secondary" @click.prevent="refresh">{{ $t('refresh') }}</button>
                </div>
              </div>
              <div class="col-md-5 col-lg-4">
                <search-form class="mt-3 mt-sm-0" v-model="search" />
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th width="10%">
                      <sortable-column column="users.id" v-model="sort">{{ $t('id') }}</sortable-column>
                    </th>
                    <th width="35%">
                      <sortable-column column="users.email" v-model="sort">{{ $t('email') }}</sortable-column>
                    </th>
                    <th width="15%">
                      <sortable-column column="users.confirmed" v-model="sort">{{ $t('confirmed') }}</sortable-column>
                    </th>
                    <th width="15%">
                      <sortable-column column="users.blacklisted" v-model="sort">{{ $t('blacklisted') }}</sortable-column>
                    </th>
                    <th class="text-end">{{ $t('actions') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users">
                    <td>{{ user.id }}</td>
                    <td>{{ user.email }}</td>
                    <td><yes-no :expression="user.confirmed" /></td>
                    <td><yes-no :expression="user.blacklisted" /></td>
                    <td class="text-end">
                      <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-light" :title="$t('edit')"><i class="mdi mdi-pencil"></i></button>
                        <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(user)"><i class="mdi mdi-eye-outline"></i></button>
                        <button type="button" class="btn btn-danger" :title="$t('delete')" @click.prevent="destroy(user)"><i class="mdi mdi-close"></i></button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="users && users.length === 0">
                    <td colspan="5">
                      {{ $t('messages.no_users') }}
                    </td>
                  </tr>
                </tbody>
              </table>
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
    <toasts :messages="messages" />
    <modal id="modal-subscriber-create" :title="$t('create_subscriber')" size="md">
      <user-create-form ref="formUserCreate" @created="handleCreated" />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-secondary" @click.prevent="reset">{{ $t('reset') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="store">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal id="modal-subscriber-view" :title="$t('subsciber_details')" size="lg">
      <user-view :user="selectedUser" />      
    </modal>        
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { IUser } from '~/types'
const { t } = useI18n()
const props = defineProps({
  endpoint: { type: String }
})
const { 
  resource, 
  search, 
  sort,
  meta,
  page, 
  limit,
  info,
  refresh 
} = useDataTable(props)
const { messages, addToast } = useToasts()
const { $bootstrap } = useNuxtApp()
const formUserCreate = ref<null | { reset: () => void, store: () => void }>(null)
const selectedUser = ref<IUser>({} as IUser)
// Computed
const users = computed<IUser[]>(() => {
  return resource?.value?.data as IUser[]
})
// Functions
const destroy = async (user: IUser) => {
  const name = user.email
  const model = t('subscriber')
  const message = t('messages.confirm_destroy_name', { name })
  if (confirm(message)) {
    await useApi(`/admin/users/destroy/${user.id}`, {
      method: 'delete',
      onResponse({ request, response, options }) {
        if (response.status === 204) {
          refresh()
          addToast({
            header: t('success'),
            body: t('messages.model_destroyed', { model })
          })
        }
      },
    })
  }
}
const handleCreated = (): void => {
  onCreated()
}
const onCreated = () => {
  const el = document.getElementById('modal-subscriber-create')
  const modal = $bootstrap.Modal.getOrCreateInstance(el)
  const model = t('subscriber')
  modal.hide()
  refresh()
  addToast({ 
    header: t('success'),
    body: t('messages.model_created', { model })
  })
}
const reset = (): void => {
  if (formUserCreate.value) {
    formUserCreate.value.reset()
  }
}
const show = (user: IUser): void => {
  selectedUser.value = user
  const el = document.getElementById('modal-subscriber-view')
  const modal = new $bootstrap.Modal(el)
  modal.show()
}
const store = (): void => {
  if (formUserCreate.value) {
    formUserCreate.value.store()
  }
}
onMounted(() => {
  refresh()
})
</script>