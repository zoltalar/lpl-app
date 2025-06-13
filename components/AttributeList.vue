<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('attributes') }}</h4>
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
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-attribute-options" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ $t('options') }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-attribute-options">
                      <li><a href="/attributes" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-attribute-create" v-if="hasRole('admin') || can('attribute-create')">{{ $t('create') }}</a></li>
                      <li><a href="/attributes" class="dropdown-item" @click.prevent="refresh" v-if="hasRole('admin') || can('attribute-view')">{{ $t('refresh') }}</a></li>
                    </ul>
                  </div>
                </div>
                <!-- desktop options -->
                <div class="d-inline-block d-none d-md-inline-block">
                  <div class="btn-group" role="group" :aria-label="$t('attribute_options')">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-attribute-create" v-if="hasRole('admin') || can('attribute-create')">{{ $t('create') }}</button>
                    <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin') || can('attribute-view')">{{ $t('refresh') }}</button>
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
                        <sortable-column column="attributes.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="25%">
                        <sortable-column column="attributes.slug" v-model="sort">{{ $t('slug') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="attributes.input_type" v-model="sort">{{ $t('input_type') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="attributes.required" v-model="sort">{{ $t('required') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="attributes.active" v-model="sort">{{ $t('active') }}</sortable-column>
                      </th>
                      <th class="text-end">{{ $t('actions') }}</th>
                    </tr>
                    <transition name="fade">
                      <tr v-if="toggleFilters">
                        <th>
                          <filter-input v-model="filters.id" />
                        </th>
                        <th>
                          <filter-input v-model="filters.slug" />
                        </th>
                        <th>
                          <select class="form-select form-select-sm" v-model="filters.input_type">
                            <option></option>
                            <option :value="type" v-for="(name, type) in inputTypes">{{ name }}</option>
                          </select>
                        </th>
                        <th>
                          <select class="form-select form-select-sm" v-model="filters.required">
                            <option></option>
                            <option :value="1">{{ $t('yes') }}</option>
                            <option :value="0">{{ $t('no') }}</option>
                          </select>
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
                    <tr v-for="attribute in attributes">
                      <td>{{ attribute.id }}</td>
                      <td>
                        <code>{{ attribute.slug }}</code>
                      </td>
                      <td>
                        <span v-if="attribute.input_type">
                          {{ inputTypeName(attribute.input_type) }}
                        </span>
                        <span v-else> - </span>
                      </td>
                      <td>
                        <yes-no :expression="attribute.required" />
                      </td>
                      <td>
                        <yes-no :expression="attribute.active" />
                      </td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button type="button" class="btn btn-light" :title="$t('edit')" @click.prevent="edit(attribute)" v-if="hasRole('admin') || can('attribute-edit')"><i class="mdi mdi-pencil"></i></button>
                          <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(attribute)" v-if="hasRole('admin') || can('attribute-view')"><i class="mdi mdi-eye-outline"></i></button>
                          <button type="button" class="btn btn-danger" :title="$t('delete')" @click.prevent="destroy(attribute)" v-if="hasRole('admin') || can('attribute-delete')"><i class="mdi mdi-close"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="attributes && attributes.length === 0">
                      <td colspan="6">
                        {{ $t('messages.no_attributes') }}
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
      id="modal-attribute-create"
      :title="$t('create_attribute')"
      size="lg"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <attribute-create-form ref="formAttributeCreate" @created="handleCreated" />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-secondary" @click.prevent="reset">{{ $t('reset') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="store">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal
      id="modal-attribute-edit"
      :title="$t('edit_attribute')"
      size="lg"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <attribute-edit-form :attribute="selectedAttribute" ref="formAttributeEdit" @updated="handleUpdated" />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="update">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal
      id="modal-attribute-view"
      :title="$t('attribute_details')"
      size="lg"
    >
      <attribute-view :attribute="selectedAttribute" />
    </modal>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { IAttribute } from '@/types'
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
const formAttributeCreate = useTemplateRef<HTMLFormElement>('formAttributeCreate')
const formAttributeEdit = useTemplateRef<HTMLFormElement>('formAttributeEdit')
const selectedAttribute = ref<IAttribute>({} as IAttribute)
// Composables
const { t } = useI18n()
const { messages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { can } = usePermission()
const {
  inputTypes,
  inputTypeName,
  refresh: refreshAttributes
} = useAttribute()
const { $bootstrap } = useNuxtApp()
// Computed
const attributes = computed<IAttribute[]>(() => {
  return resource?.value?.data as IAttribute[]
})
// Functions
const destroy = async (attribute: IAttribute) => {
  const name = attribute.slug
  const model = t('attribute')
  const message = t('messages.confirm_destroy_name', { name })
  if (confirm(message)) {
    await useApi(`/admin/attributes/${attribute.id}`, {
      method: 'delete',
      onResponse({ request, response, options }) {
        if (response.status === 204) {
          refresh()
          refreshAttributes()
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
const edit = (attribute: IAttribute): void => {
  selectedAttribute.value = attribute
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-attribute-edit')
  modal.show()
}
const handleCreated = (): void => {
  onCreated()
}
const handleUpdated = (): void => {
  onUpdated()
}
const onCreated = (): void => {
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-attribute-create')
  const model = t('attribute')
  modal.hide()
  refresh()
  refreshAttributes()
  addToast({ 
    header: t('success'),
    body: t('messages.model_created', { model })
  })
}
const onUpdated = (): void => {
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-attribute-edit')
  const model = t('attribute')
  modal.hide()
  refresh()
  refreshAttributes()
  addToast({ 
    header: t('success'),
    body: t('messages.model_updated', { model })
  })
}
const reset = (): void => {
  formAttributeCreate.value?.reset()
}
const show = (attribute: IAttribute): void => {
  selectedAttribute.value = attribute
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-attribute-view')
  modal.show()
}
const store = (): void => {
  formAttributeCreate.value?.store()
}
const update = (): void => {
  formAttributeEdit.value?.update()
}
onMounted(() => {
  refresh()
})
</script>