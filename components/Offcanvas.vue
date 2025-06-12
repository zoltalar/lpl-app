<template>
  <div class="offcanvas" :class="css()" tabindex="-1" :aria-labelledby="ariaLabelledBy" ref="offcanvas">
    <div class="offcanvas-header">
      <h4 class="offcanvas-title" :id="ariaLabelledBy">{{ title }}</h4>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" :aria-label="$t('close')"></button>
    </div>
    <div class="offcanvas-body">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
// Vars
interface Props {
  direction?: 'start' | 'end' | 'top' | 'bottom',
  title: string
}
const props = withDefaults(defineProps<Props>(), {
  direction: 'start'
})
const id = useId()
// Computed
const ariaLabelledBy = computed<string>(() => {
  return ['offcanvas', 'label', id].join('-')
})
// Functions
const css = (): Record<string, boolean> => {
  let classes: Record<string, boolean> = {}
  const key = 'offcanvas-' + props.direction
  classes[key] = true
  return classes
}
</script>