<template>
  <mailing-list-list endpoint="/admin/mailing-lists/index" />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// Utilities
definePageMeta({
  layout: 'default'
})
// Composables
const { fetchData } = useApp()
await useAsyncData('app-data', () => fetchData())
const { t } = useI18n()
const { preferredTheme } = useUi()
// Utilities
useHead({
  htmlAttrs: {
    'data-bs-theme': preferredTheme(),
  },
  titleTemplate: (title) => {
    return `${title} - ${t('mailsender')}`
  }
})
useSeoMeta({
  'title': t('messages.title_mailing_lists'),
})
</script>