export default function useFile() {
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
  return {
    extension,
    fileName,
    fileSize
  }
}