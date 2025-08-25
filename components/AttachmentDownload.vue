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
// Composables
const { extension } = useFile()
const { $_ } = useNuxtApp()
// Computed
const attachment = computed<IAttachment>(() => {
  return props.attachment as IAttachment
})
// Functions
const download = async (): Promise<void> => {
  const timestamp = (new Date()).getTime()
  await useApi(`/admin/attachments/download/${attachment.value.id}&timestamp=${timestamp}`, {
    responseType: 'arrayBuffer',
    onResponse({ response }) {
      if (attachment.value.mime) {
        const blob: Blob = new Blob([response._data], { type: attachment.value.mime })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.target = '_blank'
        link.download = [$_.kebabCase(attachment.value.name), extension(attachment.value.file)].join('.')
        link.click()
      }
    },
  })
}
</script>