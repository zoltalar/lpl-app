<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="page-title-box">
          <h4 class="page-title">{{ $t('queue') }}</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row toolbar">
              <div class="col-12">
                <!-- mobile options -->
                <div class="d-inline-block d-md-none">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdown-queue-options" data-bs-toggle="dropdown" aria-expanded="false">
                      {{ $t('options') }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdown-queue-options">
                      <li>
                        <a href="/queue" class="dropdown-item" v-if="hasRole('admin') || can('queue-process')">
                          <span class="me-2">{{ $t('process_queue') }}</span>
                          <span class="badge badge-danger" v-if="messageCount > 0">{{ messageCount }}</span>
                        </a>
                      </li>
                      <li><a href="/queue" class="dropdown-item" @click.prevent="refresh" v-if="hasRole('admin') || can('queue-view')">{{ $t('refresh') }}</a></li>
                    </ul>
                  </div>
                </div>
                <!-- desktop options -->
                <div class="d-inline-block d-none d-md-inline-block">
                  <div class="btn-group" role="group" :aria-label="$t('user_options')">
                    <button type="button" class="btn btn-primary" v-if="hasRole('admin') || can('queue-process')">
                      <span>{{ $t('process_queue') }}</span>
                      <span class="badge badge-danger ms-2" v-if="messageCount > 0">{{ messageCount }}</span>
                    </button>
                    <button type="button" class="btn btn-secondary" @click.prevent="refresh" v-if="hasRole('admin') || can('user-view')">{{ $t('refresh') }}</button>
                  </div>
                </div>
                <div class="spinner-border spinner-border-sm ms-3" role="status" v-if="busy">
                  <span class="visually-hidden">{{ $t('loading') }}...</span>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <form class="form-default">
                <table class="table table-hover table-list">
                  <thead>
                    <tr>
                      <th width="8%">
                        <sortable-column column="processes.id" v-model="sort">{{ $t('id') }}</sortable-column>
                      </th>
                      <th width="12%">
                        <sortable-column column="processes.alive" v-model="sort">{{ $t('alive') }}</sortable-column>
                      </th>
                      <th width="12%">
                        <sortable-column column="processes.ip" v-model="sort">{{ $t('ip_address') }}</sortable-column>
                      </th>
                      <th width="20%">
                        {{ $t('message') }}
                      </th>
                      <th width="20%">
                        {{ $t('subscriber') }}
                      </th>
                      <th width="15%">
                        <sortable-column column="processes.created_at" v-model="sort">{{ $t('created_at') }}</sortable-column>
                      </th>
                      <th width="15%">
                        <sortable-column column="processes.updated_at" v-model="sort">{{ $t('updated_at') }}</sortable-column>
                      </th>
                      <th class="text-end">{{ $t('actions') }}</th>
                    </tr>            
                  </thead>
                  <tbody>
                    <tr v-for="process in processes">
                      <td>{{ process.id }}</td>
                      <td><yes-no :expression="process.alive > 0" /></td>
                      <td>{{ process.ip }}</td>
                      <td>
                        <span v-if="process.message">
                          <span class="text-truncate d-block" :title="process.message.name" style="width: 250px;">
                            {{ process.message.name }}
                          </span>
                        </span>
                        <span v-else> - </span>
                      </td>
                      <td>
                        <span v-if="process.subscriber">
                          <span class="text-truncate d-block" :title="process.subscriber.email" style="width: 250px;">
                            {{ process.subscriber.email }}
                          </span>
                        </span>
                        <span v-else> - </span>
                      </td>
                      <td>
                        <span v-if="process.created_at">
                          {{ useDateFormat(process.created_at, dateTimeFormat(currentUser)) }}
                        </span>
                        <span v-else> - </span>
                      </td>
                      <td>
                        <span v-if="process.updated_at">
                          {{ useDateFormat(process.updated_at, dateTimeFormat(currentUser)) }}
                        </span>
                        <span v-else> - </span>
                      </td>
                      <td class="text-end">
                        <div class="btn-group btn-group-sm">
                          <button type="button" class="btn btn-light" :title="$t('view')" @click.prevent="show(process)" v-if="hasRole('admin') || can('queue-view')"><i class="mdi mdi-eye-outline"></i></button>
                          <button type="button" class="btn btn-danger" :title="$t('kill')" @click.prevent="kill(process)" v-if="hasRole('admin') || can('queue-kill')"><i class="mdi mdi-close-octagon-outline"></i></button>
                        </div>
                      </td>
                    </tr>
                    <tr v-if="processes && processes.length === 0">
                      <td colspan="8">
                        {{ $t('messages.no_processes') }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>              
            </div>
            <div class="row">
              <div class="col-12">
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
      id="modal-process-view"
      :title="$t('process_details')"
      size="lg"
    >
      <process-view :process="selectedProcess" />
    </modal>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import type { IProcess, IUser } from '@/types'
// Vars
const props = defineProps({
  endpoint: { type: String }
})
const {
  busy,
  resource,
  sort,
  info,
  refresh
} = useDataTable(props)
const selectedProcess = ref<IProcess>({} as IProcess)
const messageCount = ref<number>(0)
// Composables
const { t } = useI18n()
const { messages, addToast } = useToasts()
const { has: hasRole } = useRole()
const { can } = usePermission()
const { data } = useAuth()
const { dateTimeFormat } = useUser()
const { $bootstrap } = useNuxtApp()
// Computed
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
const processes = computed<IProcess[]>(() => {
  return resource?.value?.data as IProcess[]
})
// Functions
const kill = async (process: IProcess) => {
  const name = process.id
  const model = t('process')
  const message = t('messages.confirm_process_kill_name', { name })
  if (confirm(message)) {
    await useApi(`/admin/processes/${process.id}`, {
      method: 'delete',
      onResponse({ response }) {
        if (response.status === 204) {
          refresh()
          addToast({
            header: t('success'),
            body: t('messages.model_killed', { model })
          })
        } else {
          addToast({
            header: t('error'),
            body: t('messages.model_name_kill_error', { model, name }),
            type: 'danger'
          })
        }
      },
    })
  }
}
const scheduledMessageCount = async (): Promise<number> => {
  const response = await useApi<{ count: number }>('/admin/messages/scheduled-count')
  return response.count as number
}
const show = (process: IProcess): void => {
  selectedProcess.value = process
  $bootstrap.Modal.getOrCreateInstance('#modal-process-view')?.show()
}
onMounted(async () => {
  refresh()
  messageCount.value = await scheduledMessageCount()
})
</script>