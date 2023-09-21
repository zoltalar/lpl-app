<template>
    <a class="sortable" :class="css()" @click.prevent="sort"><slot /></a>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { useSortableColumnStore } from '~/store/sortable-column'
const props = defineProps({
    collection: { type: String },
    column: { type: String }
})
const direction = ref('')
const store = useSortableColumnStore()
const { setCollection, setColumn, setDirection } = store
const { currentColumn } = storeToRefs(store)
watch(currentColumn, (newColumn, oldColumn) => {
    if (newColumn !== props.column) {
        direction.value = ''
    }
})
const sort = () => {    
    if (direction.value === 'desc') {
        direction.value = 'asc'
    } else {
        direction.value = 'desc'
    }
    setCollection(props.collection)
    setColumn(props.column)
    setDirection(direction.value)
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
</script>