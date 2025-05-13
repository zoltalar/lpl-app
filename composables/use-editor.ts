import Quill from 'quill'
export default function useEditor() {
  // Vars
  const renderEditor = ref<boolean>(true)
  // Functions
  const toggleEditor = (id: string, html: string | undefined): void => {
    renderEditor.value = ! renderEditor.value
    if (renderEditor.value) {
      nextTick(() => {   
        const quill = quillInstance(id)
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
    renderEditor,
    toggleEditor,
    quillInstance
  }
}