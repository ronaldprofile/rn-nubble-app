import { MutationsOptions, QueryKeys } from '@appInfra'
import { postCommentService } from '../postCommentService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export function usePostCommentRemove(
  postId: number,
  options?: MutationsOptions<string>
) {
  const queryClient = useQueryClient()

  const { mutate, isLoading, isError } = useMutation<
    string,
    unknown,
    { postCommentId: number }
  >({
    mutationFn: variables => postCommentService.remove(variables.postCommentId),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList, postId]
      })

      if (options?.onSuccess) {
        options.onSuccess(data)
      }
    },

    onError: err => {
      if (options?.onError) {
        options.onError(options.errorMessage || 'Algo de errado aconteceu :(')
      }
    }
  })

  async function removeComment(postCommentId: number) {
    mutate({ postCommentId })
  }

  return {
    removeComment,
    isLoading,
    isError
  }
}
