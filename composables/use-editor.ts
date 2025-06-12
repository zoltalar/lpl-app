import Quill from 'quill'
export default function useEditor() {
  // Vars
  const editors = ref<Record<string, boolean>>({})
  // Functions
  const registerEditor = (editorId: string): void => {
    editors.value[editorId] = false
  }
  const renderEditor = (editorId: string): boolean => {
    return editors.value[editorId] ?? false
  }  
  const toggleEditor = (editorId: string, html: string | undefined): void => {
    editors.value[editorId] = !editors.value[editorId]
    if (editors.value[editorId]) {
      nextTick(() => {
        const quill = quillInstance(editorId)
        if (quill instanceof Quill) {
          quill.clipboard.dangerouslyPasteHTML(html ?? '', Quill.sources.SILENT)
        }
      })
    }
  }
  const quillInstance = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      return Quill.find(element)
    }
    return null
  }
  return {
    // Functions
    registerEditor,
    renderEditor,
    toggleEditor,
    quillInstance
  }
}