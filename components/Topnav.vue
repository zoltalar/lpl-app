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
                <nuxt-link to="/subscribers" class="dropdown-item">{{ $t('manage') }}</nuxt-link>
                <nuxt-link to="/subscribers/import" class="dropdown-item">{{ $t('import') }}</nuxt-link>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a id="top-nav-lists" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ $t('lists') }}</a>
              <div class="dropdown-menu" aria-labelledby="top-nav-lists">
                <nuxt-link to="/lists" class="dropdown-item">{{ $t('manage') }}</nuxt-link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>