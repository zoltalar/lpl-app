<template>
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
            <slot name="header"></slot>
            <button type="button" class="btn-close" data-bs-dismiss="toast" :aria-label="$t('close')"></button>
        </div>
        <div class="toast-body">
            <slot />
        </div>
    </div>
</template>
<script setup>
import { Toast } from 'bootstrap'
onMounted(() => {
    const toast = new Toast(document.getElementById('toast-1'))
    toast.show()
})
</script>