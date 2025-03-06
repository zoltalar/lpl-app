import type { NitroFetchRequest, TypedInternalResponse } from 'nitropack'
import type { FetchOptions } from 'ofetch'
    
export const useApi = <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(request: R, options?: FetchOptions | undefined): Promise<TypedInternalResponse<R, T>> => {
  const config = useRuntimeConfig()
  const { token } = useAuth()
  const headers = new Headers()

  if (token.value) {
    headers.append('authorization', token.value.toString())
  }
    
  const api = $fetch.create({
    baseURL: config.public.apiUrl,
    headers
  })
    
  return api(request, options)
}