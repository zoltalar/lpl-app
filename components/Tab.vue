<template>
  <li class="nav-item">
    <a
      :href="hash()"
      class="nav-link"
      aria-current="page"
      ref="anchor"
      data-bs-toggle="tab"
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
  active: {
    type: Boolean,
    required: false,
    default: false
  }
})
const emits = defineEmits(['tabSelect'])
const slot = ref<HTMLSpanElement|null>(null)
const anchor = ref<HTMLAnchorElement|null>(null)
// Functions
const hash = (): string => {
  return ['#', props.title.toLowerCase()].join('')
}
const select = () => {
  emits('tabSelect', { content: slot.value?.innerHTML })
}
</script>