<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" aria-labelledby="offcanvas-title">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvas-title">{{ $t('create_subscriber') }}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" :aria-label="$t('close')"></button>
    </div>
    <div class="offcanvas-body">
      <slot />
    </div>
  </div>
</template>