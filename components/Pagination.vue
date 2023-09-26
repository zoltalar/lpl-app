<template>
    <nav :aria-label="$t('navigation')">
        <ul class="pagination">
            <li class="page-item" v-for="(link) in links">
                <a
                    :href="url.pathname"
                    class="page-link"
                    :class="{ 'active': link.active, 'disabled': !link.url }"
                    v-html="link.label"
                    @click.prevent="goto(link.label)"></a>
            </li>
        </ul>
    </nav>
</template>
<script setup>
const props = defineProps({
    modelValue: { 
        type: Number, 
        required: false 
    },
    meta: { type: Object }
})
const emits = defineEmits(['update:modelValue'])
const links = computed(() => {
    return props.meta.links || []
})
const url = computed(() => {
    return new URL(props.meta.path)
})
const goto = (page) => {
    page = parseInt(page)
    emits('update:modelValue', page)
}
</script>