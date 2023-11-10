<template>
  <nav :aria-label="$t('navigation')">
    <ul class="pagination">
      <li class="page-item">
        <a 
          href="/"
          class="page-link"
          :class="{'disabled': current <= 1}"
          @click.prevent="goto(current - 1)"
        >&laquo;</a>
      </li>
      <li class="page-item" v-for="i in range">
        <a
          href="/"
          class="page-link"
          :class="{ 'active': current === i }"
          @click.prevent="goto(i)"
        >{{ i }}</a>
      </li>
      <li class="page-item">
        <a 
          href="/"
          class="page-link"
          :class="{'disabled': current >= last}"
          @click.prevent="goto(current + 1)"
        >&raquo;</a>
      </li>
    </ul>
  </nav>
</template>
<script setup lang="ts">
const props = defineProps(['modelValue', 'meta'])
const emits = defineEmits(['update:modelValue'])
const current = computed(() => {
  return props.meta.current_page || 1
})
const last = computed(() => {
  return props.meta.last_page || 1
})
const range = computed(() => {
  let i = 1
  if (current.value - 2 > 0) {
    i = current.value - 2
  }
  const range = []
  const max = i + 5
  for ( ; i <= last.value && i <= max; i++) {
    range.push(i)
  }
  return range
})
const goto = (page) => {
  page = parseInt(page)
  emits('update:modelValue', page)
}
</script>