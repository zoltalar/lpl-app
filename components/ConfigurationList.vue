<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('configuration') }}</h4>
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
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-configuration-options" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ $t('options') }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-configuration-options">
                      <li><a href="/configuration" class="dropdown-item" @click.prevent="refresh" v-if="hasRole('admin')">{{ $t('refresh') }}</a></li>
                    </ul>
                  </div>
                </div>
                <!-- desktop options -->
                <div class="d-inline-block d-none d-md-inline-block">
                  <div class="btn-group" role="group" :aria-label="$t('configuration_options')">
                    <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin')">{{ $t('refresh') }}</button>
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
                        <sortable-column column="configurations.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="25%">
                        <sortable-column column="configurations.slug" v-model="sort">{{ $t('slug') }}</sortable-column>
                      </th>
                      <th width="30%">
                        <sortable-column column="configurations.value" v-model="sort">{{ $t('value') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="configurations.updatable" v-model="sort">{{ $t('updatable') }}</sortable-column>
                      </th>
                      <th class="text-end">{{ $t('actions') }}</th>
                    </tr>
                    <transition name="fade">
                      <tr v-if="toggleFilters">
                        <th>
                          <filter-input :disabled="busy" v-model="filters.id" />
                        </th>
                        <th>
                          <filter-input :disabled="busy" v-model="filters.slug" />
                        </th>
                        <th>
                          <filter-input :disabled="busy" v-model="filters.value" />
                        </th>
                        <th>
                          <select class="form-select form-select-sm" :disabled="busy" v-model="filters.updatable">
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
                    <tr v-for="configuration in configurations">
                      <td>{{ configuration.id }}</td>
                      <td>
                        <code class="text-secondary">{{ configuration.slug }}</code>
                      </td>
                      <td>
                        <code class="text-truncate mb-0 d-block" style="width: 400px;">
                          {{ configuration.value ?? '-' }}
                        </code>
                      </td>
                      <td>
                        <yes-no :expression="configuration.updatable === 1" />
                      </td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(configuration)" v-if="hasRole('admin')"><i class="mdi mdi-eye-outline"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="configurations && configurations.length === 0">
                      <td colspan="5">
                        {{ $t('messages.no_configuration') }}
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
      id="modal-configuration-view"
      :title="$t('configuration_item_details')"
      size="lg"
    >
      <configuration-view :configuration="selectedConfiguration" />
    </modal>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { IConfiguration } from '@/types'
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
const selectedConfiguration = ref<IConfiguration>({} as IConfiguration)
// Composables
const { t } = useI18n()
const { messages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { $bootstrap } = useNuxtApp()
// Computed
const configurations = computed<IConfiguration[]>(() => {
  return resource?.value?.data as IConfiguration[]
})
// Functions
const show = (configuration: IConfiguration): void => {
  selectedConfiguration.value = configuration
  $bootstrap.Modal.getOrCreateInstance('#modal-configuration-view')?.show()
}
onMounted(() => {
  refresh()
})
</script>