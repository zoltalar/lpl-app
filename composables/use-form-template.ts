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
    renderEditor,
    toggleEditor
  } = useEditor()
  return {
    fields,
    form,
    options,
    renderEditor,
    // Functions
    toggleEditor
  }
}