<template>
  <div class="toast-container bottom-0 end-0 p-3">
    <toast v-for="message in messages">
      <template #header>
        <strong class="me-auto">{{ message.header }}</strong>
      </template>
      {{ message.body }}
    </toast>
  </div>
</template>
<script setup lang="ts">
import type { TToastMessage } from '~/types'
const props = defineProps({
  messages: { type: Array<TToastMessage> }
})
</script>