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
                <!-- mobile options -->
                <div class="d-inline-block d-md-none">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-subscriber-options" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ $t('options') }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-subscriber-options">
                      <li><a href="/subscribers" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-subscriber-create" v-if="hasRole('admin') || can('subscriber-create')">{{ $t('create') }}</a></li>
                      <li><a href="/subscribers" class="dropdown-item" @click.prevent="refresh" v-if="hasRole('admin') || can('subscriber-view')">{{ $t('refresh') }}</a></li>
                      <li><a href="/subscribers" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-subscriber-import-list" v-if="hasRole('admin') || can('subscriber-import')">{{ $t('import_from_list') }}</a></li>
                      <li><a href="/subscribers" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-subscriber-import-file" v-if="hasRole('admin') || can('subscriber-import')">{{ $t('import_from_file') }}</a></li>
                    </ul>
                  </div>
                </div>
                <!-- desktop options -->
                <div class="d-inline-block d-none d-md-inline-block">
                  <div class="btn-toolbar" role="toolbar" :aria-label="$t('subscriber_options_toolbar')">
                    <div class="btn-group me-2" role="group" :aria-label="$t('subscriber_options')">
                      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-subscriber-create" v-if="hasRole('admin') || can('subscriber-create')">{{ $t('create') }}</button>
                      <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin') || can('subscriber-view')">{{ $t('refresh') }}</button>
                    </div>
                    <div class="btn-group" role="group" :aria-label="$t('subscriber_options')">
                      <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{{ $t('import') }}</button>
                      <ul class="dropdown-menu">
                        <li><a href="/subscribers" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-subscriber-import-list" v-if="hasRole('admin') || can('subscriber-import')">{{ $t('import_from_list') }}</a></li>
                        <li><a href="/subscribers" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-subscriber-import-file" v-if="hasRole('admin') || can('subscriber-import')">{{ $t('import_from_file') }}</a></li>
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
                      <th width="10%">
                        <sortable-column column="subscribers.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="30%">
                        <sortable-column column="subscribers.email" v-model="sort">{{ $t('email') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="subscribers.confirmed" v-model="sort">{{ $t('confirmed') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="subscribers.blacklisted" v-model="sort">{{ $t('blacklisted') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="subscribers.active" v-model="sort">{{ $t('active') }}</sortable-column>
                      </th>
                      <th class="text-end">{{ $t('actions') }}</th>
                    </tr>
                    <transition name="fade">
                      <tr v-if="toggleFilters">
                        <th>
                          <filter-input :disabled="busy" v-model="filters.id" />
                        </th>
                        <th>
                          <filter-input :disabled="busy" v-model="filters.email" />
                        </th>
                        <th>
                          <select class="form-select form-select-sm" :disabled="busy" v-model="filters.confirmed">
                            <option></option>
                            <option :value="1">{{ $t('yes') }}</option>
                            <option :value="0">{{ $t('no') }}</option>
                          </select>
                        </th>
                        <th>
                          <select class="form-select form-select-sm" :disabled="busy" v-model="filters.blacklisted">
                            <option></option>
                            <option :value="1">{{ $t('yes') }}</option>
                            <option :value="0">{{ $t('no') }}</option>
                          </select>
                        </th>
                        <th>
                          <select class="form-select form-select-sm" :disabled="busy" v-model="filters.active">
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
                    <tr v-for="subscriber in subscribers">
                      <td>{{ subscriber.id }}</td>
                      <td>{{ subscriber.email }}</td>
                      <td>
                        <yes-no :expression="subscriber.confirmed" />
                      </td>
                      <td>
                        <yes-no :expression="subscriber.blacklisted" :inverse="true" />
                      </td>
                      <td>
                        <yes-no :expression="subscriber.active" />
                      </td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button type="button" class="btn btn-light" :title="$t('edit')" @click.prevent="edit(subscriber)" v-if="hasRole('admin') || can('subscriber-edit')"><i class="mdi mdi-pencil"></i></button>
                          <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(subscriber)" v-if="hasRole('admin') || can('subscriber-view')"><i class="mdi mdi-eye-outline"></i></button>
                          <button type="button" class="btn btn-danger" :title="$t('delete')" @click.prevent="destroy(subscriber)" v-if="hasRole('admin') || can('subscriber-delete')"><i class="mdi mdi-close"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="subscribers && subscribers.length === 0">
                      <td colspan="6">
                        {{ $t('messages.no_subscribers') }}
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
      id="modal-subscriber-create"
      :title="$t('create_subscriber')"
      size="md"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <subscriber-create-form
        ref="formSubscriberCreate"
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
      id="modal-subscriber-import-list"
      :title="$t('import_subscribers_from_list')"
      size="lg"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <subscriber-import-list-form
        ref="formSubscriberImportList"
        @processed="handleProcessed"
        @errors="handleErrors"
      />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-secondary" @click.prevent="resetImportList">{{ $t('reset') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="processImportList">{{ $t('submit') }}</button>
      </template>
    </modal>
    <modal
      id="modal-subscriber-import-file"
      :title="$t('import_subscribers_from_file')"
      size="lg"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <subscriber-import-file-form
        ref="formSubscriberImportFile"
        @processed="handleProcessed"
        @errors="handleErrors"
      />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-secondary" @click.prevent="resetImportFile">{{ $t('reset') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="processImportFile">{{ $t('submit') }}</button>
      </template>
    </modal>
    <modal
      id="modal-subscriber-edit"
      :title="$t('edit_subscriber')"
      size="md"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <subscriber-edit-form
        :subscriber="selectedSubscriber"
        ref="formSubscriberEdit"
        @updated="handleUpdated"
        @errors="handleErrors"
      />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="update">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal
      id="modal-subscriber-view"
      :title="$t('subscriber_details')"
      size="xl"
    >
      <subscriber-view :subscriber="selectedSubscriber" />
    </modal>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ISubscriber } from '@/types'
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
const formSubscriberCreate = useTemplateRef<HTMLFormElement>('formSubscriberCreate')
const formSubscriberImportFile = useTemplateRef<HTMLFormElement>('formSubscriberImportFile')
const formSubscriberImportList = useTemplateRef<HTMLFormElement>('formSubscriberImportList')
const formSubscriberEdit = useTemplateRef<HTMLFormElement>('formSubscriberEdit')
const selectedSubscriber = ref<ISubscriber>({} as ISubscriber)
// Composables
const { t } = useI18n()
const { messages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { can } = usePermission()
const { $bootstrap } = useNuxtApp()
// Computed
const subscribers = computed<ISubscriber[]>(() => {
  return resource?.value?.data as ISubscriber[]
})
// Functions
const destroy = async (subscriber: ISubscriber) => {
  const name = subscriber.email
  const model = t('subscriber')
  const message = t('messages.confirm_destroy_name', { name })
  if (confirm(message)) {
    await useApi(`/admin/subscribers/${subscriber.id}`, {
      method: 'delete',
      onResponse({ response }) {
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
const edit = (subscriber: ISubscriber): void => {
  selectedSubscriber.value = subscriber
  $bootstrap.Modal.getOrCreateInstance('#modal-subscriber-edit')?.show()
}
const handleCreated = (): void => {
  onCreated()
}
const handleErrors = (errors: Record<string,string>): void => {
  onErrors(errors)
}
const handleProcessed = (): void => {
  onProcessed()
}
const handleUpdated = (): void => {
  onUpdated()
}
const onCreated = (): void => {
  const model = t('subscriber')
  $bootstrap.Modal.getOrCreateInstance('#modal-subscriber-create')?.hide()
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
const onProcessed = (): void => {
  $bootstrap.Modal.getOrCreateInstance('#modal-subscriber-import-list')?.hide()
  refresh()
  addToast({ 
    header: t('success'),
    body: t('messages.subscribers_import_processed')
  })
}
const onUpdated = (): void => {
  const model = t('subscriber')
  $bootstrap.Modal.getOrCreateInstance('#modal-subscriber-edit')?.hide()
  refresh()
  addToast({ 
    header: t('success'),
    body: t('messages.model_updated', { model })
  })
}
const processImportFile = (): void => {
  formSubscriberImportFile.value?.process()
}
const processImportList = (): void => {
  formSubscriberImportList.value?.process()
}
const reset = (): void => {
  formSubscriberCreate.value?.reset()
}
const resetImportFile = (): void => {
  formSubscriberImportFile.value?.reset()
}
const resetImportList = (): void => {
  formSubscriberImportList.value?.reset()
}
const show = (subscriber: ISubscriber): void => {
  selectedSubscriber.value = subscriber
  $bootstrap.Modal.getOrCreateInstance('#modal-subscriber-view')?.show()
}
const store = (): void => {
  formSubscriberCreate.value?.store()
}
const update = (): void => {
  formSubscriberEdit.value?.update()
}
onMounted(() => {
  refresh()
})
</script>