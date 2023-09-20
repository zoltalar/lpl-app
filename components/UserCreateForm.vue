<template>
    <form @submit.prevent="store" novalidate>
        <div class="mb-3">
            <label for="input-email" class="form-label">{{ $t('email') }}</label>
            <span class="text-danger ms-1">*</span>
            <input type="email" class="form-control" id="input-email" aria-describedby="text-email" v-model="user.email">
            <div class="invalid-feedback d-block" v-if="errors.email !== undefined">
                {{ errors.email }}
            </div>
        </div>
        <div class="mb-3">
            <label for="input-password" class="form-label">{{ $t('password') }}</label>
            <input type="password" class="form-control" id="input-password" v-model="user.password">
            <div class="invalid-feedback d-block" v-if="errors.password !== undefined">
                {{ errors.password }}
            </div>
        </div>
        <div class="mb-3">
            <div class="form-check form-switch">
                <input type="checkbox" id="input-html-email" class="form-check-input" aria-describedby="text-html-email" :true-value="1" :false-value="0" v-model="user.html_email">
                <label for="input-html-email" class="form-check-label">{{ $t('html_email') }}</label>
            </div>
            <div id="text-html-email" class="form-text">{{ $t('messages.form_text_user_html_email') }}</div>
        </div>
        <div class="mb-3">
            <div class="form-check form-switch">
                <input type="checkbox" id="input-confirmed" class="form-check-input" aria-describedby="text-confirmed" :true-value="1" :false-value="0" v-model="user.confirmed">
                <label for="input-confirmed" class="form-check-label">{{ $t('confirmed') }}</label>
            </div>
            <div id="text-confirmed" class="form-text">{{ $t('messages.form_text_user_confirmed') }}</div>
        </div>        
        <div class="mb-3">
            <div class="form-check form-switch">
                <input type="checkbox" id="input-blacklisted" class="form-check-input" aria-describedby="text-blacklisted" :true-value="1" :false-value="0" v-model="user.blacklisted">
                <label for="input-blacklisted" class="form-check-label">{{ $t('blacklisted') }}</label>
            </div>
            <div id="text-blacklisted" class="form-text">{{ $t('messages.form_text_user_blacklisted') }}</div>
        </div>
        <div class="mb-3">
            <div class="form-check form-switch">
                <input type="checkbox" id="input-disabled" class="form-check-input" aria-describedby="text-disabled" :true-value="1" :false-value="0" v-model="user.disabled">
                <label for="input-disabled" class="form-check-label">{{ $t('disabled') }}</label>
            </div>
            <div id="text-disabled" class="form-text">{{ $t('messages.form_text_user_disabled') }}</div>
        </div>
        <div class="mb-0">
            <button type="submit" class="btn btn-primary">{{ $t('create') }}</button>
            <button class="btn btn-secondary ms-2" @click.prevent="reset">{{ $t('reset') }}</button>
        </div>
    </form>
</template>
<script setup>
const emit = defineEmits(['user:created'])
const initialState = () => {
    return {
        email: '',
        password: '',
        html_email: 1,
        confirmed: 0,
        blacklisted: 0,
        disabled: 0
    }
}
const user = ref(initialState())
const { errors, clearErrors, transformErrors } = useUserForm()
const store = async () => {
    clearErrors()
    const config = useRuntimeConfig()
    const response = await $fetch('/api/admin/users/store', {
        method: 'post',
        body: user._rawValue,
        baseURL: config.public.baseURL
    })
    .catch((error) => {
        errors.value = transformErrors(error.response._data.errors)
    })
    if (response.data.data) {
        emit('user:created', response.data.data)
        reset()
    }
}
const reset = () => {
    const keys = Object.keys(initialState())
    keys.forEach((key) => {
        user.value[key] = initialState()[key]
    })
    clearErrors()
}
</script>