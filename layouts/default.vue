<template>
  <client-only>
    <header>
      <navbar />
      <topnav />
    </header>
    <div class="content">
      <div class="container-fluid">
        <slot />
      </div>
    </div>
    <app-footer />
  </client-only>
</template>