<template>
    <nav class="navbar navbar-expand-lg navbar-custom">
        <div class="container">
            <nuxt-link to="/dashboard" class="navbar-brand"><img src="@/assets/img/phplist-logo.png" :alt="$t('phplists')" /></nuxt-link>
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
                            <li><nuxt-link to="/campaigns/create" class="dropdown-item">{{ $t('campaign') }}</nuxt-link></li>
                            <li><nuxt-link to="/users/create" class="dropdown-item">{{ $t('subscriber') }}</nuxt-link></li>
                            <li><nuxt-link to="/attributes/create" class="dropdown-item">{{ $t('attribute') }}</nuxt-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>