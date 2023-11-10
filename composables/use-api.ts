import type { NitroFetchRequest, TypedInternalResponse } from 'nitropack'
import type { FetchOptions } from 'ofetch'
    
export const useApi = <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(request: R, options?: FetchOptions | undefined): Promise<TypedInternalResponse<R, T>> => {
  const config = useRuntimeConfig()
    
  const apiFetch = $fetch.create({
    baseURL: config.public.apiUrl
  })
    
  return apiFetch(request, options)
}