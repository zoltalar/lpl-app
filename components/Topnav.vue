<template>
  <div class="top-nav">
    <div class="container">
      <nav class="navbar navbar-light navbar-expand-lg">
        <div class="navbar-collapse collapse" id="top-nav-menu">
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxt-link to="/dashboard" class="nav-link" role="button">{{ $t('dashboard') }}</nuxt-link>
            </li>
            <li class="nav-item dropdown">
              <a id="top-nav-subscribers" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ $t('subscribers') }}</a>
              <div class="dropdown-menu" aria-labelledby="top-nav-subscribers">
                <nuxt-link to="/" class="dropdown-item">{{ $t('manage') }}</nuxt-link>
                <nuxt-link to="/" class="dropdown-item">{{ $t('import') }}</nuxt-link>
              </div>
            </li>
            <li class="nav-item">
              <nuxt-link to="/" class="nav-link">{{ $t('lists') }}</nuxt-link>
            </li>
            <li class="nav-item" v-if="hasRole('admin') || can('attachment-view')">
              <nuxt-link to="/attachments" class="nav-link">{{ $t('attachments') }}</nuxt-link>
            </li>
            <li class="nav-item" v-if="hasRole('admin') || can('user-view')">
              <nuxt-link to="/users" class="nav-link">{{ $t('users') }}</nuxt-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
// Composables
const { has: hasRole } = useRole()
const { can } = usePermission()
</script>