<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('lists') }}</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row toolbar">
              <div class="col-md-7 col-lg-8">
                <div class="btn-group" role="group" :aria-label="$t('list_options')">
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal-list-create">{{ $t('create') }}</button>
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
                      <sortable-column column="lists.id" v-model="sort">{{ $t('id') }}</sortable-column>
                    </th>
                    <th width="30%">
                      <sortable-column column="lists.name" v-model="sort">{{ $t('name') }}</sortable-column>
                    </th>
                    <th width="15%">
                      <sortable-column column="lists.active" v-model="sort">{{ $t('active') }}</sortable-column>
                    </th>
                    <th width="15%">
                      <sortable-column column="lists.list_order" v-model="sort">{{ $t('list_order') }}</sortable-column>
                    </th>
                    <th class="text-end">{{ $t('actions') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="list in lists">
                    <td>{{ list.id }}</td>
                    <td>{{ list.name }}</td>
                    <td><yes-no :expression="list.active" /></td>
                    <td>{{ list.list_order }}</td>
                    <td class="text-end">
                      <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-light" :title="$t('edit')"><i class="mdi mdi-pencil"></i></button>
                        <button type="button" class="btn btn-light" :title="$t('view')"><i class="mdi mdi-eye-outline"></i></button>
                        <button type="button" class="btn btn-danger" :title="$t('delete')"><i class="mdi mdi-close"></i></button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="lists && lists.length === 0">
                    <td colspan="5">
                      {{ $t('messages.no_lists') }}
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
    <modal id="modal-list-create" :title="$t('create_list')" size="md">
      <list-create-form ref="formListCreate" @created="handleCreated" />
      <template #footer>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ $t('close') }}</button>
        <button type="button" class="btn btn-secondary" @click.prevent="reset">{{ $t('reset') }}</button>
        <button type="button" class="btn btn-primary" @click.prevent="store">{{ $t('save') }}</button>
      </template>
    </modal>     
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { IList } from '~/types'
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
const formListCreate = ref<null | { reset: () => void, store: () => void }>(null)
const selectedList = ref<IList>({} as IList)
// Computed
const lists = computed<IList[]>(() => {
  return resource?.value?.data
})
// Functions
const handleCreated = (): void => {
  onCreated()
}
const onCreated = () => {
  const el = document.getElementById('modal-list-create')
  const modal = $bootstrap.Modal.getOrCreateInstance(el)
  const model = t('list')
  modal.hide()
  refresh()
  addToast({ 
    header: t('success'),
    body: t('messages.model_created', { model })
  })
}
const reset = (): void => {
  if (formListCreate.value) {
    formListCreate.value.reset()
  }
}
const store = (): void => {
  if (formListCreate.value) {
    formListCreate.value.store()
  }
}
onMounted(() => {
  refresh()
})
</script>