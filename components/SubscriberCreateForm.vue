<template>
    <form @submit.prevent="store">
        <div class="mb-3">
            <label for="input-email" class="form-label">{{ $t('email') }}</label>
            <span class="text-danger ms-1">*</span>
            <input type="email" class="form-control" id="input-email" aria-describedby="text-email" v-model="subscriber.email">
            <div id="text-email" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="input-password" class="form-label">{{ $t('password') }}</label>
            <input type="password" class="form-control" id="input-password" v-model="subscriber.password">
        </div>
        <div class="mb-3">
            <div class="form-check form-switch">
                <input type="checkbox" id="input-confirmed" class="form-check-input" aria-describedby="text-confirmed" :true-value="1" :false-value="0" v-model="subscriber.confirmed">
                <label for="input-confirmed" class="form-check-label">{{ $t('confirmed') }}</label>
            </div>
            <div id="text-confirmed" class="form-text">Indicate if email address is confirmed.</div>
        </div>
        <div class="mb-3">
            <div class="form-check form-switch">
                <input type="checkbox" id="input-blacklisted" class="form-check-input" aria-describedby="text-blacklisted" :true-value="1" :false-value="0" v-model="subscriber.blacklisted">
                <label for="input-blacklisted" class="form-check-label">{{ $t('blacklisted') }}</label>
            </div>
            <div id="text-blacklisted" class="form-text">Indicate if email address is blacklisted.</div>
        </div>
        <div class="mb-0">
            <button type="submit" class="btn btn-primary">{{ $t('create') }}</button>
        </div>
    </form>
</template>
<script setup lang="ts">
const subscriber = reactive({
    email: '',
    password: '',
    confirmed: 0,
    blacklisted: 0
})
let errors = ref({})
async function store() {
    const { data, error } = await useApiFetch('/api/admin/users/store', {
        method: 'POST',
        body: { subscriber },        
    })
    if (error) {
        errors = error.value?.data.errors
    }
}
</script>