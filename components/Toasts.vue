<template>
    <div class="position-fixed bottom-0 end-0 p-3">
        <div
            v-for="(toast) in toasts"
            :id="toast.id"
            class="toast opacity-75"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-bs-delay="10000"
        >
            <div class="toast-header bg-danger">
                <button type="button" class="btn-close" data-bs-dismiss="toast" :aria-label="$t('close')"></button>
            </div>
            <div class="toast-body">{{ toast.body }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Toasts'
}
</script>
<script setup>
import { Toast } from 'bootstrap'
const props = defineProps({
    toasts: {
        type: Array,
        default: () => []
    }
})
onUpdated(() => {
    const hiddenToasts = props.toasts.filter((toast) => {
        return toast.show === false
    })
    hiddenToasts.forEach((toast) => {
        const el = document.getElementById(toast.id)
        const theToast = new Toast(el)
        theToast.show()
    })
})
</script>