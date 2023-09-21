<template>
    <user-list @sort="test" />
</template>
<script setup>
definePageMeta({
    layout: 'default'
})
const test = () => {
    alert('test')
}
</script>