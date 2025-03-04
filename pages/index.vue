<template>
  <div class="card">
    <div class="card-body p-4">
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
    </div>
  </div>
  <div class="authentication-subtext">
    <p>
      <nuxt-link to="/">{{ $t('forgot_password?') }}</nuxt-link>
    </p>
  </div>
</template>
<script setup lang="ts">
// Utilities
definePageMeta({
  layout: 'authentication',
  auth: false
})
useHead({
  bodyAttrs: {
    class: 'authentication',
  },
})
// Vars
const error = ref<string>('')
// Composables
const { status } = useAuth()
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
</script>