<template>
  <div class="top-nav">
    <div class="container">
      <nav class="navbar navbar-light navbar-expand-lg">
        <div class="navbar-collapse collapse" id="top-nav-menu">
          <ul class="navbar-nav">
            <li class="nav-item">
              <nuxt-link to="/dashboard" class="nav-link" role="button">{{ $t('dashboard') }}</nuxt-link>
            </li>
            <li class="nav-item" v-if="hasRole('admin') || can('template-view')">
              <nuxt-link to="/templates" class="nav-link">{{ $t('templates') }}</nuxt-link>
            </li>
            <li class="nav-item" v-if="hasRole('admin') || can('subscriber-view')">
              <nuxt-link to="/subscribers" class="nav-link">{{ $t('subscribers') }}</nuxt-link>
            </li>
            <li class="nav-item" v-if="hasRole('admin') || can('attribute-view')">
              <nuxt-link to="/attributes" class="nav-link">{{ $t('attributes') }}</nuxt-link>
            </li>
            <li class="nav-item" v-if="hasRole('admin') || can('mailing-list-view')">
              <nuxt-link to="/mailing-lists" class="nav-link">{{ $t('mailing_lists') }}</nuxt-link>
            </li>
            <li class="nav-item dropdown">
              <a id="top-nav-system" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ $t('system') }}</a>
              <div class="dropdown-menu" aria-labelledby="top-nav-system">
                <nuxt-link to="/attachments" class="dropdown-item" v-if="hasRole('admin') || can('attachment-view')">{{ $t('attachments') }}</nuxt-link>
                <nuxt-link to="/subscribe-pages" class="dropdown-item" v-if="hasRole('admin') || can('subscribe-page-view')">{{ $t('subscribe_pages') }}</nuxt-link>
                <nuxt-link to="/users" class="dropdown-item" v-if="hasRole('admin') || can('user-view')">{{ $t('users') }}</nuxt-link>
              </div>
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