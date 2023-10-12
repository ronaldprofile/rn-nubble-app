import { useState } from 'react'

export interface MutationsOptions<TData> {
  onSuccess?: (data: TData) => void
  onError?: (message: string) => void
  errorMessage?: string
}

/**
 * @deprecated use useMutation from @tanstack/react-query
 */

export function useMutation<TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: MutationsOptions<TData>
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<boolean | null>(null)

  async function mutate(variables: TVariables) {
    try {
      setError(null)
      setLoading(true)

      const data = await mutationFn(variables)

      if (options?.onSuccess) {
        options.onSuccess(data)
      }
    } catch (error) {
      setError(true)

      if (options?.onError) {
        options.onError(options.errorMessage || '')
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    mutate,
    loading,
    error
  }
}
