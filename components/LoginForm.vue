<template>
  <form @submit.prevent="login">
    <div class="mb-3">
      <label for="input-email" class="form-label">
        {{ $t('email') }}
        <required-input />
      </label>
      <input
        type="text"
        class="form-control form-control-lg"
        :class="{'is-invalid': invalid}"
        id="input-email"
        v-model="form.email"
      />
    </div>
    <div class="mb-3">
      <label for="input-password" class="form-label">
        {{ $t('password') }}
        <required-input />
      </label>
      <input
        type="password"
        class="form-control form-control-lg"
        :class="{'is-invalid': invalid}"
        id="input-password"
        v-model="form.password"
      />
    </div>
    <div class="d-grid">
      <button type="submit" class="btn btn-primary btn-lg">{{ $t('login') }}</button>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { IUser } from '~/types'
// Vars
const emits = defineEmits(['login', 'error'])
const form = reactive<Pick<IUser,'email'|'password'>>({
  email: '',
  password: ''
})
const busy = ref<boolean>(false)
const invalid = ref<boolean>(false)
// Composables
const { signIn } = useAuth()
// Functions
const login = async (): Promise<void> => {
  busy.value = true
  invalid.value = false
  try {
    await signIn({ ...form }, { redirect: false })
    emits('login')
  } catch (error) {
    invalid.value = true
    emits('error', { message: error })
  }
  busy.value = false
}
</script>