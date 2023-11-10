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
                <div class="btn-group" role="group" aria-label="Subscriber options">
                  <button type="button" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-subscriber-create" aria-controls="Create new subscriber">{{ $t('create') }}</button>
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
                  <tr v-for="(user, i) in users">
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
    <div class="offcanvas offcanvas-start" id="offcanvas-subscriber-create" tabindex="-1" aria-labelledby="offcanvas-title">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvas-title">{{ $t('create_subscriber') }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" :aria-label="$t('close')"></button>
      </div>
      <div class="offcanvas-body">
        <user-create-form @created="() => afterCreated()" />
      </div>
    </div>
    <modal id="modal-subscriber-view" :title="$t('subsciber_details')" size="lg">
      <user-view :user="selectedUser" />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-primary">{{ $t('save') }}</button>
      </template>
    </modal>        
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
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
const selectedUser = ref({})
const users = computed(() => {
  return resource.value.data
})
const afterCreated = () => {
  const model = t('subscriber')
  refresh()
  addToast({ 
    header: t('success'),
    body: t('messages.model_created', { model })
  })
}
const destroy = async (user) => {
  const name = user.email
  const model = t('subscriber')
  const message = t('messages.confirm_destroy_name', { name })
  if (confirm(message)) {
    const config = useRuntimeConfig()
    await $fetch(`/api/admin/users/destroy/${user.id}`, {
      method: 'delete',
      baseURL: config.public.baseURL,
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
const show = (user) => {
  selectedUser.value = user
  const el = document.getElementById('modal-subscriber-view')
  const modal = new $bootstrap.Modal(el)
  modal.show()
}
onMounted(() => {
  refresh()
})
</script>