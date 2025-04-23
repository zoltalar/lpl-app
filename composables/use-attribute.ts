import { useI18n } from 'vue-i18n'
import { useAttributeStore } from '@/store/attribute'
import type {
  IAttribute,
  IAttributeLabel,
  IAttributeOption,
  IAttributePlaceholder
} from '@/types'

export default function useAttribute() {
  // Vars
  const busy = ref<boolean>(false)
  // Composables
  const attributeStore = useAttributeStore()
  const { locale } = useI18n()
  const { $_ } = useNuxtApp()
  // Computed
  const attributes = computed<IAttribute[]>(() => {
    return attributeStore.getCollection
  })
  const inputTypes = computed<Record<number,string>>(() => {
    return attributeStore.getMeta.input_types
  })
  // Functions
  const dynamicOption = (option: string): boolean => {
    return ['[STATES]'].includes(option)
  }
  const inputId = (attribute: IAttribute, prefix?: string | null): string => {
    const elements = ['input']
    if (prefix) {
      elements.push(prefix)
    }
    elements.push(inputName(attribute))
    return elements.join('-')
  }
  const inputName = (attribute: IAttribute): string => {
    return $_.kebabCase(attribute.slug)
  }
  const inputType = (attribute: IAttribute): number => {
    return Number(attribute.input_type)
  }
  const inputTypeName = (inputType: number): string => {
    return inputTypes.value[inputType] ?? ''
  }
  const label = (attribute: IAttribute): string => {
    if (attribute.labels) {
      const label = attribute.labels.find((label: IAttributeLabel) => {
        return label.code === locale.value
      })
      return label?.label ?? ''
    }
    return ''
  } 
  const refresh = async (): Promise<void> => {
    busy.value = true
    await attributeStore.refreshCollection()
    setTimeout(() => {
      busy.value = false
    }, 1000)
  }
  const maxlength = (attribute: IAttribute): number => {
    return Number(attribute.maxlength)
  }
  const normalizeValue = (value: any): any | null => {
    return $_.isString(value) || $_.isNumber(value) ? value : null
  }
  const option = (attribute: IAttribute): string => {
    if (attribute.options) {
      const option = attribute.options.find((option: IAttributeOption) => {
        return option.code === locale.value
      })
      return option?.option ?? ''
    }
    return ''
  }
  const placeholder = (attribute: IAttribute): string => {
    if (attribute.placeholders) {
      const placeholder = attribute.placeholders.find((placeholder: IAttributePlaceholder) => {
        return placeholder.code === locale.value
      })
      return placeholder?.placeholder ?? ''
    }
    return ''
  }
  const required = (attribute: IAttribute): boolean => {
    return attribute.required === 1
  }
  return {
    // Vars
    busy,
    // Computed
    attributes,
    inputTypes,
    // Functions
    dynamicOption,
    inputId,
    inputName,
    inputType,
    inputTypeName,
    label,
    maxlength,
    normalizeValue,
    option,
    placeholder,
    refresh,
    required
  }
}