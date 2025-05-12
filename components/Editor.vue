<template>
  <div :id="props.id + '-toolbar'">
    <span class="ql-formats">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="ql-underline"></button>
      <button class="ql-strike"></button>
    </span>
    <span class="ql-formats">
      <select class="ql-color"></select>
      <select class="ql-background"></select>
    </span>
    <span class="ql-formats">
      <button class="ql-script" value="sub"></button>
      <button class="ql-script" value="super"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-header" value="1"></button>
      <button class="ql-header" value="2"></button>
      <button class="ql-blockquote"></button>
      <button class="ql-code-block"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-list" value="ordered"></button>
      <button class="ql-list" value="bullet"></button>
    </span>
    <span class="ql-formats">
      <button class="ql-direction" value="rtl"></button>
      <select class="ql-align"></select>
      <select class="ql-header">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
        <option value="5"></option>
        <option value="6"></option>
        <option selected></option>
      </select>
    </span>
    <span class="ql-formats">
      <button class="ql-link"></button>      
    </span>
    <span class="ql-formats">
      <button class="ql-clean"></button>
    </span>
  </div>
  <div :id="id" ref="element"></div>
</template>
<script setup lang="ts">
/*global defineEmits,defineProps,withDefaults*/
import { onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import Quill, { Range, type QuillOptions } from 'quill'
import { Delta } from 'quill/core'
// Vars
interface Props {
  modelValue?: string,
  id?: string,
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: 'quill',
  disabled: false
})
const emits = defineEmits(['ready','blur','focus','update:modelValue'])
const element = ref<HTMLDivElement|null>(null)
let quill: Quill | null = null
const defaultOptions: QuillOptions = {
  theme: 'snow',
  bounds: document.body,
  modules: {
    toolbar: {
      container: `#${props.id}-toolbar`,
    },
  },
  placeholder: '',
  readOnly: false
}
// Watch
watch(() => props.modelValue, (value) => {
  if (value === '') {
    quill?.setContents([])
  }
})
// Functions
const initialize = (): void => {
  if (element.value) {
    const options = defaultOptions
    options.readOnly = props.disabled ? true : false
    quill = new Quill(element.value, options)
    // Events
    quill.on('selection-change', (range: Range) => {
      if (! range) {
        emits('blur', quill)
      } else {
        emits('focus', quill)
      }
    })
    quill.on('text-change', (delta: Delta, oldContents: Delta, source: string) => {
      let html = quill?.getSemanticHTML().replaceAll(/((?:&nbsp;)*)&nbsp;/g, '$1 ')
      emits('update:modelValue', html)
    })    
    emits('ready', quill)
  }
}
const destruct = (): void => {
  if (element.value) {
    const toolbar = element.value.previousSibling
    if (toolbar && toolbar.nodeType === 1) {
      toolbar.parentNode?.removeChild(toolbar)
    }
  }
}
onMounted(() => {
  initialize()
})
onBeforeUnmount(() => {
  destruct()
})
onUnmounted(() => {
  quill = null
})
</script>