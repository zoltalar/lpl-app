import type { ITemplate } from '@/types'

export default function useFormTemplate() {
  // Vars
  const fields = {
    name: '',
    content_html: '',
    content_text: ''
  }
  const form = reactive<Partial<ITemplate>>({...fields})
  const options = reactive<Record<string, number>>({})
  // Composables
  const {
    registerEditor,
    renderEditor,
    toggleEditor
  } = useEditor()
  return {
    fields,
    form,
    options,
    // Functions
    registerEditor,
    renderEditor,
    toggleEditor
  }
}