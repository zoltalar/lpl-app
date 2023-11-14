<template>
  <div class="input-group">
    <label class="input-group-text" for="input-page-size">{{ $t('page_size') }}</label>
    <select class="form-select" id="input-page-size" v-model="limit">
      <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { useDataTableStore } from '~/store/data-table'
defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const limit = ref<number>(10)
const options: number[] = [5, 10, 25, 50, 100]
const dataTableStore = useDataTableStore()
// Watch
watch(limit, () => {
  dataTableStore.setPerPage(limit.value)
  emits('update:modelValue', limit.value)
})
</script>
<style scoped>
.input-group {
  max-width: 12rem;
}
</style>