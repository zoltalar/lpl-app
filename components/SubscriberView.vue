<template>
  <div class="alert alert-danger" role="alert" v-if="user.blacklisted === 1">
    {{ $t('messages.user_blacklisted') }}
  </div>
  <tabs>
    <tab :title="$t('general')" target="#user-general" active />
    <tab :title="$t('lists')" target="#user-lists" />
    <tab :title="$t('campaigns')" target="#user-campaigns" />
    <tab :title="$t('bounces')" target="#user-bounces" />
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
              {{ user.id }}
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('uuid') }}
            </td>
            <td>
              <code>{{ user.uuid }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('email') }}
            </td>
            <td>
              {{ user.email }}
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('password_set?') }}
            </td>
            <td>
              <yes-no :expression="user.password_set" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('html_email') }}
            </td>
            <td>
              <yes-no :expression="user.html_email" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('confirmed') }}
            </td>
            <td>
              <yes-no :expression="user.confirmed" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('disabled') }}
            </td>
            <td>
              <yes-no :expression="user.disabled" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('blacklisted') }}
            </td>
            <td>
              <yes-no :expression="user.blacklisted" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('opted_in') }}
            </td>
            <td>
              <yes-no :expression="user.opted_in" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('bounce_count') }}
            </td>
            <td>
              {{ user.bounce_count }}
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('unique_id') }}
            </td>
            <td>
              <code>{{ user.unique_id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_at') }}
            </td>
            <td>
              {{ user.created_at }}
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_at') }}
            </td>
            <td>
              {{ user.updated_at }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tab-pane fade" id="user-lists" role="tabpanel" aria-labelledby="tab-lists">
      <ul class="mb-0" v-if="lists && lists.length > 0">
        <li v-for="list in lists">{{ list.name }}</li>
      </ul>
      <p class="mb-0" v-else>{{ $t('messages.user_no_lists') }}</p>
    </div>
    <div class="tab-pane fade" id="user-campaigns" role="tabpanel" aria-labelledby="tab-campaigns">
      <p>Test 3</p>
    </div>
    <div class="tab-pane fade" id="user-bounces" role="tabpanel" aria-labelledby="tab-bounces">
      <p>Test 4</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IList } from '~/types'
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})
// Computed
const lists = computed<IList[]>(() => {
  return props.user.lists
})
</script>