<template>
    <div class="input-group">
        <label class="input-group-text" for="input-page-size">{{ $t('page_size') }}</label>
        <select class="form-select" id="input-page-size" v-model="limit">
            <option v-for="(option, key) in options" :value="key">{{ option }}</option>
        </select>
    </div>
</template>
<script setup>
defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const limit = ref(10)
const options = computed(() => {
    return {
        1: 1,
        10: 10,
        25: 25,
        50: 50,
        100: 100
    }
})
watch(limit, () => {
    emits('update:modelValue', limit.value)
})
</script>
<style scoped>
.input-group {
    max-width: 12rem;
}
</style>