<template>
  <form class="form-default" @submit.prevent="login">
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
        tabindex="1"
        v-model="form.email"
      />
    </div>
    <div class="mb-3">
      <nuxt-link to="/" class="float-end" tabindex="4">{{ $t('forgot_password?') }}</nuxt-link>
      <label for="input-password" class="form-label">
        {{ $t('password') }}
        <required-input />
      </label>
      <div class="input-group">
        <input
          :type="inputType"
          class="form-control form-control-lg"
          :class="{'is-invalid': invalid}"
          id="input-password"
          tabindex="2"
          v-model="form.password"
        />
        <button type="button" class="btn btn-outline-secondary" tabindex="3" @click.prevent="toggleInput">
          <i :class="inputIcon"></i>
        </button>
      </div>
    </div>
    <div class="d-grid">
      <button type="submit" class="btn btn-primary btn-lg">
        {{ $t('login') }}
      </button>
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
const { inputType, inputIcon, toggleInput } = usePassword()
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