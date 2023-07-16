import type { PropsWithChildren } from 'react'
import {
  QueryClient,
  QueryClientProvider as BaseQueryClientProvider
} from 'react-query'
import { toastError } from 'utils/toast'

export const queryClient = new QueryClient()
queryClient.setDefaultOptions({
  queries: { staleTime: 10 * 1000 },
  mutations: {
    onError: (err: any) => {
      if (err?.message) {
        return toastError(err?.message)
      }
      throw err
    }
  }
})

export default function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
    </BaseQueryClientProvider>
  )
}
