<template>
  <li class="nav-item" role="presentation">
    <a
      :href="href()"
      class="nav-link"
      :class="{'active': active}"
      :id="id()"
      aria-current="page"
      ref="anchor"
      data-bs-toggle="tab"
      :data-bs-target="target"
    >
      {{ title }}
    </a>
  </li>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  target: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: false,
    default: false
  }
})
const anchor = ref<HTMLAnchorElement|null>(null)
// Functions
const href = (): string => {
  return ['#', props.title.toLowerCase()].join('')
}
const id = (): string => {
  return ['tab', props.title.toLowerCase()].join('-')
}
</script>