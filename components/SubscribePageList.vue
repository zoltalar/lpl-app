<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('subscribe_pages') }}</h4>
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
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-subscribe-page-options" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ $t('options') }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-subscribe-page-options">
                      <li><a href="/subscribe-pages" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-subscribe-page-create" v-if="hasRole('admin') || can('subscribe-page-create')">{{ $t('create') }}</a></li>
                      <li><a href="/subscribe-pages" class="dropdown-item" @click.prevent="refresh" v-if="hasRole('admin') || can('subscribe-page-view')">{{ $t('refresh') }}</a></li>
                    </ul>
                  </div>
                </div>
                <!-- desktop options -->
                <div class="d-inline-block d-none d-md-inline-block">
                  <div class="btn-group" role="group" :aria-label="$t('subscribe_page_options')">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-subscribe-page-create" v-if="hasRole('admin') || can('subscribe-page-create')">{{ $t('create') }}</button>
                    <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin') || can('subscribe-page-view')">{{ $t('refresh') }}</button>
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
                        <sortable-column column="subscribe_pages.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="50%">
                        <sortable-column column="subscribe_pages.name" v-model="sort">{{ $t('name') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="subscribe_pages.active" v-model="sort">{{ $t('active') }}</sortable-column>
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
                    <tr v-for="page in pages">
                      <td>{{ page.id }}</td>
                      <td>
                        <span class="text-truncate d-block" :title="page.name" style="width: 400px;">
                          {{ page.name }}
                        </span>
                      </td>
                      <td>
                        <yes-no :expression="page.active" />
                      </td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button type="button" class="btn btn-light" :title="$t('edit')" @click.prevent="edit(page)" v-if="hasRole('admin') || can('subscribe-page-edit')"><i class="mdi mdi-pencil"></i></button>
                          <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(page)" v-if="hasRole('admin') || can('subscribe-page-view')"><i class="mdi mdi-eye-outline"></i></button>
                          <button type="button" class="btn btn-danger" :title="$t('delete')" @click.prevent="destroy(page)" v-if="hasRole('admin') || can('subscribe-page-delete')"><i class="mdi mdi-close"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="pages && pages.length === 0">
                      <td colspan="4">
                        {{ $t('messages.no_subscribe_pages') }}
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
      id="modal-subscribe-page-create"
      :title="$t('create_subscribe_page')"
      size="lg"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <subscribe-page-create-form
        ref="formSubscribePageCreate"
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
      id="modal-subscribe-page-edit"
      :title="$t('edit_subscribe_page')"
      size="lg"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <subscribe-page-edit-form
        :page="selectedPage"
        ref="formSubscribePageEdit"
        @updated="handleUpdated"
        @errors="handleErrors"
      />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="update">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal
      id="modal-subscribe-page-view"
      :title="$t('subscribe_page_details')"
      size="lg"
    >
      <subscribe-page-view :page="selectedPage" />
    </modal>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { ISubscribePage } from '@/types'
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
const formSubscribePageCreate = useTemplateRef<HTMLFormElement>('formSubscribePageCreate')
const formSubscribePageEdit = useTemplateRef<HTMLFormElement>('formSubscribePageEdit')
const selectedPage = ref<ISubscribePage>({} as ISubscribePage)
// Composables
const { t } = useI18n()
const { messages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { can } = usePermission()
const { $bootstrap } = useNuxtApp()
// Computed
const pages = computed<ISubscribePage[]>(() => {
  return resource?.value?.data as ISubscribePage[]
})
// Functions
const destroy = async (page: ISubscribePage) => {
  const name = page.name
  const model = t('subscribe_page')
  const message = t('messages.confirm_destroy_name', { name })
  if (confirm(message)) {
    await useApi(`/admin/subscribe-pages/${page.id}`, {
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
const edit = (page: ISubscribePage): void => {
  selectedPage.value = page
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-subscribe-page-edit')
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
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-subscribe-page-create')
  const model = t('subscribe_page')
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
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-subscribe-page-edit')
  const model = t('subscribe_page')
  modal.hide()
  refresh()
  addToast({ 
    header: t('success'),
    body: t('messages.model_updated', { model })
  })
}
const reset = (): void => {
  formSubscribePageCreate.value?.reset()
}
const show = (page: ISubscribePage): void => {
  selectedPage.value = page
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-subscribe-page-view')
  modal.show()
}
const store = (): void => {
  formSubscribePageCreate.value?.store()
}
const update = (): void => {
  formSubscribePageEdit.value?.update()
}
onMounted(() => {
  refresh()
})
</script>