<template>
  <span class="badge" :class="css()">{{ text() }}</span>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// Vars
const props = defineProps(['expression', 'inverse'])
// Composables
const { t } = useI18n()
// Functions
const css = (): Record<string, boolean> => {
  let classes: Record<string, boolean> = {}
  const expression = props.expression
  const inverse = props.inverse ?? false
  if (parseInt(expression) === 1 || expression === true) {
    classes['text-bg-' + (inverse ? 'danger' : 'primary')] = true
  } else {
    classes['text-bg-' + (inverse ? 'primary' : 'danger')] = true
  }
  return classes
}
const text = (): string => {
  const expression = props.expression
  if (parseInt(expression) === 1 || expression === true) {
    return t('yes')
  }
  return t('no')
}
</script>