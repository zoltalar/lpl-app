<template>
  <user-list endpoint="/api/admin/users/index" />
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script>