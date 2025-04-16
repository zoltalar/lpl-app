export default function useFormMailingList() {
  // Composables
  const { types } = useMailingList()
  return {
    types
  }
}