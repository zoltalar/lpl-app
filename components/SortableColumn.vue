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
  modelValue: { type: String },
  column: { type: String }
})
const emits = defineEmits(['update:modelValue'])
const sort = ref('')
const direction = ref('')
const store = useSortableColumnStore()
const { setColumn, setDirection } = store
const { currentColumn } = storeToRefs(store)
watch(currentColumn, (newColumn, oldColumn) => {
  if (newColumn !== props.column) {
    direction.value = ''
  }
})
const order = () => {    
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
const css = () => {
  let classes = {}
  if (direction.value === 'asc') {
    classes['asc'] = true
    classes['desc'] = false
  } else if (direction.value === 'desc') {
    classes['asc'] = false
    classes['desc'] = true
  }
  return classes
}
const link = () => {
  const collection = props.column.split('.')[0]
  return `/${collection}`
}
</script>