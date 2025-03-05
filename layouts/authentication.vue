<template>
  <client-only>
    <div class="mt-5 mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-xl-4">
            <div class="card">
              <div class="card-body p-4">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>