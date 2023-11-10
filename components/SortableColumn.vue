<template>
  <a
    :href="link()"
    class="sortable"
    :class="css()" 
    @click.prevent="order"
  >
    <slot />
  </a>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSortableColumnStore } from '~/store/sortable-column'
const props = defineProps({
  modelValue: { 
    type: String 
  },
  column: { 
    type: String, 
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
const sort = ref<string>('')
const direction = ref<string>('')
const store = useSortableColumnStore()
const { setColumn, setDirection } = store
const { currentColumn } = storeToRefs(store)
// Watch
watch(currentColumn, (newColumn) => {
  if (newColumn !== props.column) {
    direction.value = ''
  }
})
// Functions
const order = (): void => {    
  if (direction.value === 'desc') {
    sort.value = props.column
    direction.value = 'asc'
  } else {
    sort.value = '-' + props.column
    direction.value = 'desc'
  }
  setColumn(props.column)
  setDirection(direction.value)
  emits('update:modelValue', sort.value)
}
const css = (): object => {
  let classes: Record<string, boolean> = {}
  if (direction.value === 'asc') {
    classes['asc'] = true
    classes['desc'] = false
  } else if (direction.value === 'desc') {
    classes['asc'] = false
    classes['desc'] = true
  }
  return classes
}
const link = (): string => {
  const collection = props.column.split('.')[0]
  return `/${collection}`
}
</script>