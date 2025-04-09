<template>
  <a href="/attachments/download" @click.prevent="download">
    <slot />
  </a>
</template>
<script setup lang="ts">
import type { IAttachment } from '@/types'
// Vars
interface Props {
  attachment?: IAttachment | null
}
const props = defineProps<Props>()
// Functions
const download = async (): Promise<void> => {
  const timestamp = (new Date()).getTime()
}
</script>