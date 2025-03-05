export default function usePassword() {
  // Vars
  const inputType = ref<string>('password')
  const inputIcon = ref<string>('mdi mdi-eye-outline')
  // Functions
  const toggleInput = (): void => {
    inputType.value = (inputType.value === 'password' ? 'text' : 'password')
    inputIcon.value = (inputType.value === 'password' ? 'mdi mdi-eye-outline' : 'mdi mdi-eye-off-outline')
  }
  return {
    inputType,
    inputIcon,
    toggleInput
  }
}