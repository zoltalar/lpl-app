<template v-if="configuration">
  <tabs id="tabs-configuration-view">
    <tab :title="$t('general')" target="#configuration-general" active />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="configuration-general" role="tabpanel" aria-labelledby="tab-general">
      <table class="table table-sm table-view mb-0">
        <tbody>
          <tr>
            <td class="table-attribute">
              {{ $t('id') }}
            </td>
            <td>
              <code>{{ configuration.id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('slug') }}
            </td>
            <td>
              <code class="text-secondary">{{ configuration.slug }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('value') }}
            </td>
            <td>
              <code>{{ configuration.value ?? '-' }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('description') }}
            </td>
            <td>
              {{ configuration.description }}
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updatable') }}
            </td>
            <td>
              <yes-no :expression="configuration.updatable" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('active') }}
            </td>
            <td>
              <yes-no :expression="configuration.active" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IConfiguration } from '@/types'
// Vars
interface Props {
  configuration?: IConfiguration | null
}
const props = defineProps<Props>()
// Computed
const configuration = computed<IConfiguration>(() => {
  return props.configuration as IConfiguration
})
</script>