<template>
  <app-logo />
  <div class="authentication-text">
    <p>{{ $t('messages.login_text') }}</p>        
  </div>
  <div class="alert alert-danger text-center" v-if="error !== ''">
    {{ $t('messages.login_error_text') }}
  </div>
  <login-form 
    @login="handleLogin"
    @error="handleError"
  />
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// Utilities
definePageMeta({
  layout: 'authentication',
  auth: false
})
// Vars
const error = ref<string>('')
// Composables
const { t } = useI18n()
const { status } = useAuth()
const { preferredTheme } = useUi()
// Watch
watch(status, async () => {
  if (status.value === 'authenticated') {
    await navigateTo('/dashboard')
  }
}, { immediate: true })
// Functions
const handleError = (object: Record<string,string>) => {
  error.value = object.message
}
const handleLogin = async (): Promise<void> => {
  await navigateTo('/dashboard')
}
// Utilities
useHead({
  htmlAttrs: {
    'data-bs-theme': preferredTheme(),
  },
  bodyAttrs: {
    class: 'authentication',
  },
  titleTemplate: (title) => {
    return `${title} - ${t('mailsender')}`
  }
})
useSeoMeta({
  'title': t('messages.title_authentication'),
})
</script>