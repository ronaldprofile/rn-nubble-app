import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postCommentService } from '../postCommentService'
import { PostComment } from '../postCommentTypes'
import { MutationsOptions, QueryKeys } from '@appInfra'

export function usePostCommentCreate(
  postId: number,
  options?: MutationsOptions<PostComment>
) {
  const queryClient = useQueryClient()

  const { mutate, isError, isLoading } = useMutation<
    PostComment,
    unknown,
    { message: string }
  >({
    mutationFn: variables =>
      postCommentService.create(postId, variables.message),

    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PostCommentList, postId]
      })

      if (options?.onSuccess) {
        options.onSuccess(data)
      }
    },

    onError: () => {
      if (options?.onError) {
        options.onError(options.errorMessage || 'Algo de errado aconteceu :(')
      }
    }
  })

  async function createComment(message: string) {
    mutate({ message })
  }

  return {
    createComment,
    isLoading,
    isError
  }
}
