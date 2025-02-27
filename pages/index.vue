<template>
  <app-logo />
  <div class="authentication-text">
    <p>{{ $t('messages.login_text') }}</p>  
  </div>
  <form>
    <div class="mb-3">
      <label for="input-email" class="form-label">{{ $t('email') }}</label>
      <input type="text" class="form-control form-control-lg" id="input-email">
    </div>
    <div class="mb-3">
      <label for="input-password" class="form-label">{{ $t('password') }}</label>
      <input type="password" class="form-control form-control-lg" id="input-password">
    </div>
    <div class="d-grid">
      <button class="btn btn-primary btn-lg">{{ $t('login') }}</button>
    </div>
  </form>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'authentication'
})
useHead({
  bodyAttrs: {
    class: 'authentication',
  },
})
</script>