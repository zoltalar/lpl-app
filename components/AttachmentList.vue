<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('attachments') }}</h4>
        </div>
      </div>
    </div>
    <div class="alert alert-warning text-center" role="alert" v-if="allowAttachments !== 1">
      {{ $t('messages.attachments_not_allowed') }}
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
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-attachment-options" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ $t('options') }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-attachment-options">
                      <li><a href="/attachments" class="dropdown-item" data-bs-toggle="modal" data-bs-target="#modal-attachment-create" v-if="(hasRole('admin') || can('attachment-create')) && allowAttachments === 1">{{ $t('create') }}</a></li>
                      <li><a href="/attachments" class="dropdown-item" @click.prevent="refresh" v-if="hasRole('admin') || can('attachment-view')">{{ $t('refresh') }}</a></li>
                    </ul>
                  </div>
                </div>
                <!-- desktop options -->
                <div class="d-inline-block d-none d-md-inline-block">
                  <div class="btn-group" role="group" :aria-label="$t('attachment_options')">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-attachment-create" v-if="(hasRole('admin') || can('attachment-create')) && allowAttachments === 1">{{ $t('create') }}</button>
                    <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin') || can('attachment-view')">{{ $t('refresh') }}</button>
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
                        <sortable-column column="attachments.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="50%">
                        <sortable-column column="attachments.name" v-model="sort">{{ $t('name') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="attachments.size" v-model="sort">{{ $t('size') }}</sortable-column>
                      </th>
                      <th class="text-end">{{ $t('actions') }}</th>
                    </tr>
                    <transition name="fade">
                      <tr v-if="toggleFilters">
                        <th>
                          <filter-input :disabled="busy" v-model="filters.id" />
                        </th>
                        <th>
                          <filter-input :disabled="busy" v-model="filters.name" />
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
                    <tr v-for="attachment in attachments">
                      <td>{{ attachment.id }}</td>
                      <td>
                        <span class="text-truncate d-block" :title="attachment.name" style="width: 500px;">
                          {{ attachment.name }}
                        </span>
                      </td>
                      <td>
                        <span v-if="attachment.size">
                          {{ formatBytes(attachment.size) }}
                        </span>
                        <span v-else> - </span>
                      </td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button type="button" class="btn btn-light" :title="$t('edit')" @click.prevent="edit(attachment)" v-if="hasRole('admin') || can('attachment-edit')"><i class="mdi mdi-pencil"></i></button>
                          <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(attachment)" v-if="hasRole('admin') || can('attachment-view')"><i class="mdi mdi-eye-outline"></i></button>
                          <attachment-download :attachment="attachment" :title="$t('download')" class="btn btn-light" v-if="hasRole('admin') || can('attachment-view')"><i class="mdi mdi-download"></i></attachment-download>
                          <button type="button" class="btn btn-danger" :title="$t('delete')" @click.prevent="destroy(attachment)" v-if="hasRole('admin') || can('attachment-delete')"><i class="mdi mdi-close"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="attachments && attachments.length === 0">
                      <td colspan="4">
                        {{ $t('messages.no_attachments') }}
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
      id="modal-attachment-create"
      :title="$t('create_attachment')"
      size="md"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <attachment-create-form
        ref="formAttachmentCreate"
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
      id="modal-attachment-edit"
      :title="$t('edit_attachment')"
      size="md"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <attachment-edit-form
        :attachment="selectedAttachment"
        ref="formAttachmentEdit"
        @updated="handleUpdated"
        @errors="handleErrors"
      />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="update">{{ $t('save') }}</button>
      </template>
    </modal>
    <modal
      id="modal-attachment-view"
      :title="$t('attachment_details')"
      size="lg"
    >
      <attachment-view :attachment="selectedAttachment" />
    </modal>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { IAttachment } from '@/types'
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
const formAttachmentCreate = useTemplateRef<HTMLFormElement>('formAttachmentCreate')
const formAttachmentEdit = useTemplateRef<HTMLFormElement>('formAttachmentEdit')
const selectedAttachment = ref<IAttachment>({} as IAttachment)
// Composables
const { t } = useI18n()
const { messages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { can } = usePermission()
const { refresh: refreshAttachments } = useAttachment()
const {
  value: configurationValue,
  findBySlug: configurationFindBySlug
} = useConfiguration()
const { formatBytes } = useFile()
const { $bootstrap } = useNuxtApp()
// Computed
const allowAttachments = computed<number>(() => {
  return Number(configurationValue(toRaw(configurationFindBySlug('allow_attachments'))))
})
const attachments = computed<IAttachment[]>(() => {
  return resource?.value?.data as IAttachment[]
})
// Functions
const destroy = async (attachment: IAttachment) => {
  const name = attachment.name
  const model = t('attachment')
  const message = t('messages.confirm_destroy_name', { name })
  if (confirm(message)) {
    await useApi(`/admin/attachments/${attachment.id}`, {
      method: 'delete',
      onResponse({ request, response, options }) {
        if (response.status === 204) {
          refresh()
          refreshAttachments()
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
const edit = (attachment: IAttachment): void => {
  selectedAttachment.value = attachment
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-attachment-edit')
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
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-attachment-create')
  const model = t('attachment')
  modal.hide()
  refresh()
  refreshAttachments()
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
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-attachment-edit')
  const model = t('attachment')
  modal.hide()
  refresh()
  refreshAttachments()
  addToast({ 
    header: t('success'),
    body: t('messages.model_updated', { model })
  })
}
const reset = (): void => {
  formAttachmentCreate.value?.reset()
}
const show = (attachment: IAttachment): void => {
  selectedAttachment.value = attachment
  const modal = $bootstrap.Modal.getOrCreateInstance('#modal-attachment-view')
  modal.show()
}
const store = (): void => {
  formAttachmentCreate.value?.store()
}
const update = (): void => {
  formAttachmentEdit.value?.update()
}
onMounted(() => {
  refresh()
})
</script>