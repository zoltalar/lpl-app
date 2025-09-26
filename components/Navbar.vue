<template>
  <nav class="navbar navbar-expand-lg navbar-custom">
    <div class="container-fluid">            
      <nuxt-link to="/dashboard" class="navbar-brand">
        <app-logo />
      </nuxt-link>
      <a class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#top-nav-menu" aria-controls="top-nav-menu" aria-expanded="false" :aria-label="$t('toggle_navigation')">
        <div class="lines">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </a>
      <div class="collapse navbar-collapse" id="navbar-primary">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="dropdown-create" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ $t('create_new') }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdown-create">
              <li><nuxt-link to="/messages/saved" class="dropdown-item">{{ $t('message') }}</nuxt-link></li>
              <li><nuxt-link to="/subscribers" class="dropdown-item">{{ $t('subscriber') }}</nuxt-link></li>
              <li><nuxt-link to="/attributes" class="dropdown-item">{{ $t('attribute') }}</nuxt-link></li>
            </ul>
          </li>
        </ul>
        <form class="app-search d-flex">
          <div class="input-group input-group-sm">
            <input type="text" class="form-control" :placeholder="$t('search') + '...'">
            <button type="button" class="btn btn-secondary">
              <i class="mdi mdi-text-search"></i>
            </button>
          </div>
        </form>
        <ul class="navbar-nav ms-3">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="dropdown-user" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="/img/avatar.jpg" :alt="$t('user')" class="avatar rounded-circle me-2" />
              <span v-if="currentUser">{{ currentUser.first_name }}</span>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdown-user">
              <li><nuxt-link to="/" class="dropdown-item">{{ $t('settings') }}</nuxt-link></li>
              <li><a href="/logout" class="dropdown-item" @click.prevent="logout">{{ $t('logout') }}</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import type { IUser } from '@/types'
// Composables
const { data, signOut } = useAuth()
// Computed
const currentUser = computed<IUser>(() => {
  return toRaw(data.value) as IUser
})
// Functions
const logout = async (): Promise<void> => {
  await signOut({ redirect: false })
  await navigateTo('/')
}
</script>