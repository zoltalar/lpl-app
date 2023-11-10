<template>
  <span class="badge" :class="css()">{{ text() }}</span>
</template>
<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps(['expression'])
const text = () => {
  const expression = props.expression
  if (parseInt(expression) === 1 || expression === true) {
    return t('yes')
  }
  return t('no')
}
const css = () => {
  let classes = {}
  const expression = props.expression
  if (parseInt(expression) === 1 || expression === true) {
    classes['text-bg-primary'] = true
  } else {
    classes['text-bg-danger'] = true
  }
  return classes
}
</script>