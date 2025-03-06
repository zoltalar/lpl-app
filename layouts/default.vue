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
    <app-footer :progress="0" />
  </client-only>
</template>