<template>
  <li class="nav-item" role="presentation">
    <a
      :href="href()"
      class="nav-link"
      :class="{'active': active}"
      :id="id()"
      aria-current="page"
      data-bs-toggle="tab"
      :data-bs-target="props.target"
    >
      {{ title }}
    </a>
  </li>
</template>
<script setup lang="ts">
// Vars
interface Props {
  title: string,
  target: string,
  active?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  target: '',
  active: false
})
const emits = defineEmits(['update:modelValue'])
// Composables
const { $_ } = useNuxtApp()
// Functions
const href = (): string => {
  return ['#', $_.kebabCase(props.title)].join('')
}
const id = (): string => {
  return ['tab', $_.kebabCase(props.title)].join('-')
}
</script>