export default function useFormSubscribePage() {
  // Composables
  const { languages } = useLanguage()
  const { emailFormats } = useSubscribePage()
  return {
    languages,
    emailFormats
  }
}