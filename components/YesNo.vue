<template>
  <span class="badge" :class="css()">{{ text() }}</span>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps(['expression'])
const text = (): string => {
  const expression = props.expression
  if (parseInt(expression) === 1 || expression === true) {
    return t('yes')
  }
  return t('no')
}
const css = (): Record<string, boolean> => {
  let classes: Record<string, boolean> = {}
  const expression = props.expression
  if (parseInt(expression) === 1 || expression === true) {
    classes['text-bg-primary'] = true
  } else {
    classes['text-bg-danger'] = true
  }
  return classes
}
</script>