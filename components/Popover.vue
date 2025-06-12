<template>
  <i
    class="mdi cursor-help fs-5 ms-1 text-secondary"
    :class="css()"
    role="button"
    ref="element"
  ></i>
</template>
<script setup lang="ts">
// Vars
interface Props {
  icon?: string,
  content: string
}
const props = withDefaults(defineProps<Props>(), {
  icon: 'mdi-help-circle-outline',
  content: ''
})
const element = useTemplateRef<HTMLElement>('element')
// Composables
const { $bootstrap } = useNuxtApp()
// Functions
const bind = (): void => {
  new $bootstrap.Popover(element.value, {
    trigger: 'hover focus',
    placement: 'top',
    html: true,
    content: () => {
      return props.content
    }
  })
}
const css = (): Record<string,boolean> => {
  const classes: Record<string,boolean> = {}
  if (props.icon) {
    classes[props.icon] = true
  }
  return classes
}
// Hooks
onMounted(() => {
  bind()
})
</script>