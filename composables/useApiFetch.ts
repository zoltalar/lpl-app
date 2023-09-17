export const useApiFetch = (request, options) => {
    const config = useRuntimeConfig()
    return useFetch(request, { baseURL: config.public.baseURL, ...options })
}