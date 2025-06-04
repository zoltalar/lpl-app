<template>
  <ul :id="props.id" class="nav nav-tabs" role="tablist">
    <slot />
  </ul>
</template>
<script setup lang="ts">
// Vars
interface Props {
  id: string
}
const props = withDefaults(defineProps<Props>(), { id: '' })
</script>