<template>
  <user-list endpoint="/admin/users/index" />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// Utilities
definePageMeta({
  layout: 'default'
})
// Composables
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
  'title': t('messages.title_users'),
})
</script>