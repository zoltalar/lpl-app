<template>
    <div class="top-nav">
        <div class="container">
            <nav class="navbar navbar-light navbar-expand-lg">
                <div class="navbar-collapse collapse" id="top-nav-menu">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <nuxt-link to="/dashboard" class="nav-link" role="button">{{ $t('dashboard') }}</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link to="/subscribers" class="nav-link" role="button">{{ $t('subscribers') }}</nuxt-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>