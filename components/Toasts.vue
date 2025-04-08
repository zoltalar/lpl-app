<template>
  <div class="toast-container bottom-0 end-0 p-3">
    <toast :class="css(message)" v-for="message in messages">
      <template #header>
        <strong class="me-auto">{{ message.header }}</strong>
      </template>
      {{ message.body }}
    </toast>
  </div>
</template>
<script setup lang="ts">
import type { TToastMessage } from '@/types'
// Vars
const props = defineProps({
  messages: { type: Array<TToastMessage> }
})
// Function
const css = (message: TToastMessage): Record<string, boolean> => {
  const classes: Record<string, boolean> = {}
  if (message.type === 'danger') {
    classes['text-bg-danger'] = true
  }
  return classes
}
</script>