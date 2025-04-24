<template v-if="user">
  <div class="alert alert-danger text-center" role="alert" v-if="user.active !== 1">
    {{ $t('messages.user_inactive') }}
  </div>
  <tabs>
    <tab :title="$t('general')" target="#user-general" active />
    <tab :title="$t('roles')" target="#user-roles" />
    <tab :title="$t('permissions')" target="#user-permissions" />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="user-general" role="tabpanel" aria-labelledby="tab-general">
      <table class="table table-sm table-view mb-0">
        <tbody>
          <tr>
            <td class="table-attribute">
              {{ $t('id') }}
            </td>
            <td>
              <code>{{ user.id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('first_name') }}
            </td>
            <td>
              <span v-if="user.first_name">
                {{ user.first_name }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('last_name') }}
            </td>
            <td>
              <span v-if="user.last_name">
                {{ user.last_name }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('email') }}
            </td>
            <td>
              <span v-if="user.email">
                <a :href="'mailto:' + user.email" class="text-secondary">{{ user.email }}</a>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('phone') }}
            </td>
            <td>
              <span v-if="user.phone">
                {{ user.phone }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('language') }}
            </td>
            <td>
              <span v-if="user.language">
                {{ user.language.name }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('date_format') }}
            </td>
            <td>
              <span v-if="user.date_format">
                {{ useDateFormat(new Date(), user.date_format) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('time_format') }}
            </td>
            <td>
              <span v-if="user.time_format">
                {{ useDateFormat(new Date(), user.time_format) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('active') }}
            </td>
            <td>
              <yes-no :expression="user.active" />
            </td>
          </tr>          
          <tr>
            <td class="table-attribute">
              {{ $t('created_at') }}
            </td>
            <td>
              <span v-if="user.created_at">
                {{ useDateFormat(user.created_at, dateTimeFormat(user)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_at') }}
            </td>
            <td>
              <span v-if="user.updated_at">
                {{ useDateFormat(user.updated_at, dateTimeFormat(user)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tab-pane fade" id="user-roles" role="tabpanel" aria-labelledby="tab-roles">
      <ul class="mb-0" v-if="user.roles && user.roles.length > 0">
        <li v-for="role in user.roles">{{ $t(role.name) }}</li>
      </ul>
      <p class="text-center mt-3 mb-0" v-else>{{ $t('no_roles') }}</p>
    </div>
    <div class="tab-pane fade" id="user-permissions" role="tabpanel" aria-labelledby="tab-permissions">
      <ul class="mb-0" v-if="user.permissions && user.permissions.length > 0">
        <li v-for="permission in user.permissions">{{ permission.name }}</li>
      </ul>
      <p class="text-center mt-3 mb-0" v-else>{{ $t('no_permissions') }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import type { IUser } from '@/types'
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
// Composables
const { dateTimeFormat } = useUser()
// Computed
const user = computed<IUser>(() => {
  return props.user as IUser
})
</script>