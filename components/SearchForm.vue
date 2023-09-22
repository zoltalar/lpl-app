<template>
    <form class="form-search" @submit.prevent="search">
        <div class="input-group">
            <input
                type="text"
                class="form-control"
                :value="modelValue"
                :placeholder="$t('search')"
                @keydown="typing = true"
                ref="input"
            >
            <button type="button" class="btn-close" :aria-label="$t('close')" @click.prevent="clear" v-if="hasInput()"></button>
            <button type="submit" class="btn btn-secondary">
                <i class="mdi mdi-text-search" />
            </button>
        </div>
    </form>
</template>
<script setup>
defineProps(['modelValue'])
const emits = defineEmits(['update:modelValue'])
const input = ref('')
const typing = ref(false)
let timeout = null
watch(typing, () => {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }
    timeout = setTimeout(() => {
        typing.value = false
        search()
    }, 1000)
})
const clear = () => {
    input.value.value = ''
    search()
}
const hasInput = () => {
    return input.value && input.value.value.length > 0
}
const search = () => {
    emits('update:modelValue', input.value.value)
}
</script>