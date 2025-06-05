<template>
  <client-only>
    <header>
      <navbar />
      <topnav />
    </header>
    <div class="content">
      <div class="container">
        <slot />
      </div>
    </div>
    <app-footer />
  </client-only>
</template>