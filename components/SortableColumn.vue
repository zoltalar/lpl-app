<template>
    <a class="sortable" :class="css()" @click.prevent="sort"><slot /></a>
</template>
<script setup>
const props = defineProps({
    collection: { type: String },
    column: { type: String }
})
const direction = ref('')
const sort = () => {
    if (direction.value === 'desc') {
        direction.value = 'asc'
    } else {
        direction.value = 'desc'
    }
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