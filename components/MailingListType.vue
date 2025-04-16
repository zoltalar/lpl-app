<template>
  <span class="badge" :class="css()">{{ text() }}</span>
</template>
<script setup lang="ts">
// Vars
interface Props {
  type?: string
}
const props = defineProps<Props>()
// Composables
const { types, type: typeName } = useMailingList()
// Computed
const type = computed<string>(() => {
  return props.type ?? ''
})
// Functions
const css = (): Record<string, boolean> => {
  let classes: Record<string, boolean> = {}
  switch (type.value) {
    case 'public':
      classes['text-bg-primary'] = true
      break
    case 'private':
      classes['text-bg-secondary'] = true
      break
    case 'temporary':
      classes['text-bg-success'] = true
      break
    case 'proof':
      classes['text-bg-info'] = true
      classes['text-white'] = true
      break
  }
  return classes
}
const text = (): string => {
  return typeName(type.value)
}
</script>