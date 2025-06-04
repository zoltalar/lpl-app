import type {
  IAttribute,
  IAttributeInputText,
  IAttributeLabel,
  IAttributeOption,
  IAttributePlaceholder  
} from '@/types'

export default function useFormAttribute() {
  // Vars
  const fields = {
    slug: '',
    input_type: null,
    maxlength: 255,
    list_order: 0,
    required: 0,
    active: 1
  }
  const form = reactive<Partial<IAttribute>>({...fields})
  const labels = ref<IAttributeLabel[]>([])
  const placeholders = ref<IAttributePlaceholder[]>([])
  const options = ref<IAttributeOption[]>([])
  const inputTexts = ref<IAttributeInputText[]>([])
  // Composables
  const { languages, name: languageName } = useLanguage()
  // Computed
  const limitable = computed<boolean>(() => {
    return [1,3].includes(Number(form.input_type))
  })
  const optionable = computed<boolean>(() => {
    return [4,5].includes(Number(form.input_type))
  })
  const placeholderable = computed<boolean>(() => {
    return [1,2,3,4].includes(Number(form.input_type))
  })
  return {
    fields,
    form,
    labels,
    placeholders,
    options,
    inputTexts,
    languages,
    languageName,
    limitable,
    optionable,
    placeholderable
  }
}