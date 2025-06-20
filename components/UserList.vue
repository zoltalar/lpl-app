<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('users') }}</h4>
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
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-user-options" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ $t('options') }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-user-options">
                      <li><a href="/users" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-user-create" v-if="hasRole('admin') || can('user-create')">{{ $t('create') }}</a></li>
                      <li><a href="/users" class="dropdown-item" @click.prevent="refresh" v-if="hasRole('admin') || can('user-view')">{{ $t('refresh') }}</a></li>
                    </ul>
                  </div>
                </div>
                <!-- desktop options -->
                <div class="d-inline-block d-none d-md-inline-block">
                  <div class="btn-group" role="group" :aria-label="$t('user_options')">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-user-create" v-if="hasRole('admin') || can('user-create')">{{ $t('create') }}</button>
                    <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin') || can('user-view')">{{ $t('refresh') }}</button>
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
                      <th width="10%">
                        <sortable-column column="users.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="users.first_name" v-model="sort">{{ $t('first_name') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="users.last_name" v-model="sort">{{ $t('last_name') }}</sortable-column>
                      </th>
                      <th width="25%">
                        <sortable-column column="users.email" v-model="sort">{{ $t('email') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="users.active" v-model="sort">{{ $t('active') }}</sortable-column>
                      </th>
                      <th class="text-end">{{ $t('actions') }}</th>
                    </tr>
                    <transition name="fade">
                      <tr v-if="toggleFilters">
                        <th>
                          <filter-input v-model="filters.id" />
                        </th>
                        <th>
                          <filter-input v-model="filters.first_name" />
                        </th>
                        <th>
                          <filter-input v-model="filters.last_name" />
                        </th>
                        <th>
                          <filter-input v-model="filters.email" />
                        </th>
                        <th>
                          <select class="form-select form-select-sm" v-model="filters.active">
                            <option></option>
                            <option :value="1">{{ $t('yes') }}</option>
                            <option :value="0">{{ $t('no') }}</option>
                          </select>
                        </th>
                        <th class="text-end">
                          -
                        </th>
                      </tr>
                    </transition>                    
                  </thead>
                  <tbody>
                    <tr v-for="user in users">
                      <td>{{ user.id }}</td>
                      <td>{{ user.first_name }}</td>
                      <td>{{ user.last_name }}</td>
                      <td>{{ user.email }}</td>
                      <td><yes-no :expression="user.active" /></td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button type="button" class="btn btn-light" :title="$t('edit')" @click.prevent="edit(user)" v-if="hasRole('admin') || can('user-edit')"><i class="mdi mdi-pencil"></i></button>
                          <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(user)" v-if="hasRole('admin') || can('user-view')"><i class="mdi mdi-eye-outline"></i></button>
                          <button type="button" class="btn btn-danger" :title="$t('delete')" @click.prevent="destroy(user)" v-if="hasRole('admin') || can('user-delete')"><i class="mdi mdi-close"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="users && users.length === 0">
                      <td colspan="6">
                        {{ $t('messages.no_users') }}
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
    <toasts :messages="messages" />
    <modal
      id="modal-user-create"
      :title="$t('create_user')"
      size="md"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <user-create-form
        ref="formUserCreate"
        @created="handleCreated"
        @errors="handleErrors"
      />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-secondary" @click.prevent="reset">{{ $t('reset') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="store">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal
      id="modal-user-edit"
      :title="$t('edit_user')"
      size="md"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <user-edit-form
        :user="selectedUser"
        ref="formUserEdit"
        @updated="handleUpdated"
        @errors="handleErrors"
      />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="update">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal
      id="modal-user-view"
      :title="$t('user_details')"
      size="lg"
    >
      <user-view :user="selectedUser" />
    </modal>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { IUser } from '@/types'
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
const formUserCreate = useTemplateRef<HTMLFormElement>('formUserCreate')
const formUserEdit = useTemplateRef<HTMLFormElement>('formUserEdit')
const selectedUser = ref<IUser>({} as IUser)
// Composables
const { t } = useI18n()
const { messages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { can } = usePermission()
const { $bootstrap } = useNuxtApp()
// Computed
const users = computed<IUser[]>(() => {
  return resource?.value?.data as IUser[]
})
// Functions
const destroy = async (user: IUser) => {
  const name = user.email
  const model = t('user')
  const message = t('messages.confirm_destroy_name', { name })
  if (confirm(message)) {
    await useApi(`/admin/users/${user.id}`, {
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
const edit = (user: IUser): void => {
  selectedUser.value = user
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-user-edit')
  modal.show()
}
const handleCreated = (): void => {
  onCreated()
}
const handleErrors = (errors: Record<string,string>): void => {
  onErrors(errors)
}
const handleUpdated = (): void => {
  onUpdated()
}
const onCreated = (): void => {
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-user-create')
  const model = t('user')
  modal.hide()
  refresh()
  addToast({ 
    header: t('success'),
    body: t('messages.model_created', { model })
  })
}
const onErrors = (errors: Record<string,string>): void => {
  addToast({ 
    header: t('failure'),
    body: t('messages.form_errors', { count: Object.keys(errors).length }),
    type: 'danger'
  })
}
const onUpdated = (): void => {
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-user-edit')
  const model = t('user')
  modal.hide()
  refresh()
  addToast({ 
    header: t('success'),
    body: t('messages.model_updated', { model })
  })
}
const reset = (): void => {
  formUserCreate.value?.reset()
}
const show = (user: IUser): void => {
  selectedUser.value = user
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-user-view')
  modal.show()
}
const store = (): void => {
  formUserCreate.value?.store()
}
const update = (): void => {
  formUserEdit.value?.update()
}
onMounted(() => {
  refresh()
})
</script>