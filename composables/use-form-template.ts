import type { ITemplate } from '@/types'

export default function useFormTemplate() {
  // Vars
  const fields = {
    name: '',
    content_html: '',
    content_text: ''
  }
  const form: Partial<ITemplate> = reactive({...fields})
  const options: Record<string, number> = reactive({})
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