<template>
    <form @submit.prevent="store" novalidate>
        <div class="mb-3">
            <label for="input-email" class="form-label">{{ $t('email') }}</label>
            <span class="text-danger ms-1">*</span>
            <input type="email" class="form-control" id="input-email" aria-describedby="text-email" v-model="user.email">
            <div class="invalid-feedback d-block" v-if="errors.email !== undefined">
                {{ errors.email }}
            </div>
            <div id="text-email" class="form-text" v-else>We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="input-password" class="form-label">{{ $t('password') }}</label>
            <input type="password" class="form-control" id="input-password" v-model="user.password">
        </div>
        <div class="mb-3">
            <div class="form-check form-switch">
                <input type="checkbox" id="input-confirmed" class="form-check-input" aria-describedby="text-confirmed" :true-value="1" :false-value="0" v-model="user.confirmed">
                <label for="input-confirmed" class="form-check-label">{{ $t('confirmed') }}</label>
            </div>
            <div id="text-confirmed" class="form-text">Indicate if email address is confirmed.</div>
        </div>
        <div class="mb-3">
            <div class="form-check form-switch">
                <input type="checkbox" id="input-blacklisted" class="form-check-input" aria-describedby="text-blacklisted" :true-value="1" :false-value="0" v-model="user.blacklisted">
                <label for="input-blacklisted" class="form-check-label">{{ $t('blacklisted') }}</label>
            </div>
            <div id="text-blacklisted" class="form-text">Indicate if email address is blacklisted.</div>
        </div>
        <div class="mb-0">
            <button type="submit" class="btn btn-primary">{{ $t('create') }}</button>
        </div>
    </form>
</template>
<script setup>
import { ref, toRaw } from 'vue'
const user = ref({
    email: '',
    password: '',
    confirmed: 0,
    blacklisted: 0
})
const errors = useValidation()
const { $transformErrors } = useNuxtApp()
const store = async () => {
    errors.value = {}
    const response = await $fetch('http://lpl-api.local/api/admin/users/store', {
        method: 'post',
        body: user._rawValue
    })
    .catch((error) => {
        errors.value = $transformErrors(error.response._data.errors)
    })
}
</script>