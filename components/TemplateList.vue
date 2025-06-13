<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('templates') }}</h4>
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
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-template-options" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ $t('options') }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-message-options">
                      <li><a href="/templates" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-template-create" v-if="hasRole('admin') || can('template-create')">{{ $t('create') }}</a></li>
                      <li><a href="/templates" class="dropdown-item" @click.prevent="refresh" v-if="hasRole('admin') || can('template-view')">{{ $t('refresh') }}</a></li>
                    </ul>
                  </div>
                </div>
                <!-- desktop options -->
                <div class="d-inline-block d-none d-md-inline-block">
                  <div class="btn-group" role="group" :aria-label="$t('template_options')">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-template-create" v-if="hasRole('admin') || can('template-create')">{{ $t('create') }}</button>
                    <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin') || can('template-view')">{{ $t('refresh') }}</button>
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
                        <sortable-column column="templates.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="50%">
                        <sortable-column column="templates.name" v-model="sort">{{ $t('name') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="templates.created_at" v-model="sort">{{ $t('created_at') }}</sortable-column>
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
                          -
                        </th>
                        <th class="text-end">
                          -
                        </th>
                      </tr>
                    </transition>                    
                  </thead>
                  <tbody>
                    <tr v-for="template in templates">
                      <td>{{ template.id }}</td>
                      <td>
                        <span class="text-truncate d-block" :title="template.name" style="width: 400px;">
                          {{ template.name }}
                        </span>
                      </td>
                      <td>
                        <span v-if="template.created_at">
                          {{ useDateFormat(template.created_at, dateTimeFormat(currentUser)) }}
                        </span>
                        <span v-else> - </span>
                      </td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button type="button" class="btn btn-light" :title="$t('edit')" @click.prevent="edit(template)" v-if="hasRole('admin') || can('template-edit')"><i class="mdi mdi-pencil"></i></button>
                          <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(template)" v-if="hasRole('admin') || can('template-view')"><i class="mdi mdi-eye-outline"></i></button>
                          <button type="button" class="btn btn-danger" :title="$t('delete')" @click.prevent="destroy(template)" v-if="hasRole('admin') || can('template-delete')"><i class="mdi mdi-close"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="templates && templates.length === 0">
                      <td colspan="4">
                        {{ $t('messages.no_templates') }}
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
      id="modal-template-create"
      :title="$t('create_template')"
      size="lg"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <template-create-form ref="formTemplateCreate" @created="handleCreated" />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-secondary" @click.prevent="reset">{{ $t('reset') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="store">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal
      id="modal-template-edit"
      :title="$t('edit_template')"
      size="lg"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <template-edit-form :template="selectedTemplate" ref="formTemplateEdit" @updated="handleUpdated" />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="update">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal
      id="modal-template-view"
      :title="$t('template_details')"
      size="lg"
    >
      <template-view :template="selectedTemplate" />
    </modal>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { ITemplate, IUser } from '@/types'
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
const formTemplateCreate = useTemplateRef<HTMLFormElement>('formTemplateCreate')
const formTemplateEdit = useTemplateRef<HTMLFormElement>('formTemplateEdit')
const selectedTemplate = ref<ITemplate>({} as ITemplate)
// Composables
const { t } = useI18n()
const { messages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { can } = usePermission()
const { data } = useAuth()
const { refresh: refreshConfigurations } = useConfiguration()
const { dateTimeFormat } = useUser()
const { refresh: refreshTemplates } = useTemplate()
const { $bootstrap } = useNuxtApp()
// Computed
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
const templates = computed<ITemplate[]>(() => {
  return resource?.value?.data as ITemplate[]
})
// Functions
const destroy = async (template: ITemplate) => {
  const name = template.name
  const model = t('template')
  const message = t('messages.confirm_destroy_name', { name })
  if (confirm(message)) {
    await useApi(`/admin/templates/${template.id}`, {
      method: 'delete',
      onResponse({ request, response, options }) {
        if (response.status === 204) {
          refresh()
          refreshTemplates()
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
const edit = (template: ITemplate): void => {
  selectedTemplate.value = template
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-template-edit')
  modal.show()
}
const handleCreated = (): void => {
  onCreated()
}
const handleUpdated = (): void => {
  onUpdated()
}
const onCreated = (): void => {
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-template-create')
  const model = t('template')
  modal.hide()
  refresh()
  refreshConfigurations()
  refreshTemplates()
  addToast({ 
    header: t('success'),
    body: t('messages.model_created', { model })
  })
}
const onUpdated = (): void => {
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-template-edit')
  const model = t('template')
  modal.hide()
  refresh()
  refreshConfigurations()
  refreshTemplates()
  addToast({ 
    header: t('success'),
    body: t('messages.model_updated', { model })
  })
}
const reset = (): void => {
  formTemplateCreate.value?.reset()
}
const show = (template: ITemplate): void => {
  selectedTemplate.value = template
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-template-view')
  modal.show()
}
const store = (): void => {
  formTemplateCreate.value?.store()
}
const update = (): void => {
  formTemplateEdit.value?.update()
}
onMounted(() => {
  refresh()
})
</script>