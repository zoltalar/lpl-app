<template v-if="attribute">
  <tabs id="tabs-attribute-view">
    <tab :title="$t('general')" target="#attribute-general" active />
  </tabs>
  <div class="tab-content py-3">
    <div class="tab-pane fade show active" id="attribute-general" role="tabpanel" aria-labelledby="tab-general">
      <table class="table table-sm table-view mb-0">
        <tbody>
          <tr>
            <td class="table-attribute">
              {{ $t('id') }}
            </td>
            <td>
              <code>{{ attribute.id }}</code>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('slug') }}
            </td>
            <td>
              <span v-if="attribute.slug">
                <code>{{ attribute.slug }}</code>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('input_type') }}
            </td>
            <td>
              <span v-if="attribute.input_type">
                {{ inputTypeName(attribute.input_type) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('labels') }}
            </td>
            <td>
              <span v-if="attribute.labels && attribute.labels.length">
                <span v-for="(label, j) in attribute.labels">
                  {{ label.label }} - {{ languageName(label.code) }}<span v-if="j < (attribute.labels.length - 1)">; </span>
                </span>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('max_length') }}
            </td>
            <td>
              <span v-if="attribute.maxlength">
                {{ attribute.maxlength }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('placeholders') }}
            </td>
            <td>
              <span v-if="attribute.placeholders && attribute.placeholders.length">
                <span v-for="(placeholder, j) in attribute.placeholders">
                  {{ placeholder.placeholder ?? '' }} - {{ languageName(placeholder.code) }}<span v-if="j < (attribute.placeholders.length - 1)">; </span>
                </span>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('options') }}
            </td>
            <td>
              <span v-if="attribute.options && attribute.options.length">
                <span v-for="(option, j) in attribute.options">
                  {{ option.option ?? '' }} - {{ languageName(option.code) }}<span v-if="j < (attribute.options.length - 1)">; </span>
                </span>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('input_help_texts') }}
            </td>
            <td>
              <span v-if="attribute.input_texts && attribute.input_texts.length">
                <span v-for="(text, j) in attribute.input_texts">
                  {{ text.text ?? '' }} - {{ languageName(text.code) }}<span v-if="j < (attribute.input_texts.length - 1)">; </span>
                </span>
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('list_order') }}
            </td>
            <td>
              <span v-if="attribute.list_order !== null">
                {{ attribute.list_order }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('required') }}
            </td>
            <td>
              <yes-no :expression="attribute.required" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('active') }}
            </td>
            <td>
              <yes-no :expression="attribute.active" />
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_at') }}
            </td>
            <td>
              <span v-if="attribute.created_at">
                {{ useDateFormat(attribute.created_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_at') }}
            </td>
            <td>
              <span v-if="attribute.updated_at">
                {{ useDateFormat(attribute.updated_at, dateTimeFormat(currentUser)) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('created_by') }}
            </td>
            <td>
              <span v-if="attribute.creator">
                {{ fullName(attribute.creator, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
          <tr>
            <td class="table-attribute">
              {{ $t('updated_by') }}
            </td>
            <td>
              <span v-if="attribute.updater">
                {{ fullName(attribute.updater, true) }}
              </span>
              <span v-else> - </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import type { IAttribute, IUser } from '@/types'
// Vars
interface Props {
  attribute?: IAttribute | null
}
const props = defineProps<Props>()
// Composables
const { data } = useAuth()
const { inputTypeName } = useAttribute()
const { name: languageName } = useLanguage()
const { dateTimeFormat, fullName } = useUser()
// Computed
const attribute = computed<IAttribute>(() => {
  return props.attribute as IAttribute
})
const currentUser = computed<IUser>(() => {
  return data.value as IUser
})
</script>