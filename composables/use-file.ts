import { useI18n } from 'vue-i18n'

export default function useFile() {
  // Composables
  const { t } = useI18n()
  // Functions
  const extension = (file: string) => {
    return file.substring(file.lastIndexOf('.') + 1)
  }
  const fileName = (file: string) => {
    return file.substring(0, file.lastIndexOf('.')) ?? file
  }
  const fileSize = (size: number) => {
    return Math.round(size / 1024)
  }
  const formatBytes = (bytes: number, decimals = 2): string => {
    const k = 1024
    const sizes = [t('bytes'), 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i]
  }
  return {
    extension,
    fileName,
    fileSize,
    formatBytes
  }
}