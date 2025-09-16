<template>
  <span class="badge" :class="css()">{{ text() }}</span>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// Vars
const props = defineProps(['status'])
// Composables
const { t } = useI18n()
const { status: messageStatus } = useMessage()
// Functions
const css = (): Record<string, boolean> => {
  let classes: Record<string, boolean> = {}
  const status = Number(props.status)
  if ([4,5].includes(status)) {
    classes['badge-danger'] = true
  } else {
    classes['badge-primary'] = true
  }
  return classes
}
const text = (): string => {
  const status = Number(props.status)
  return messageStatus(status)
}
</script>