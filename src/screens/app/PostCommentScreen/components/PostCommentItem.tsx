import { Box, ProfileAvatar, Text } from '@components'
import { PostComment, postCommentService, usePostCommentRemove } from '@domain'
import { useToastService } from '@services'
import { Alert, Pressable } from 'react-native'

interface PostCommentItemProps {
  postId: number
  postComment: PostComment
  userId: number | null
  postAuthorId: number
}

export function PostCommentItem({
  postId,
  postComment,
  postAuthorId,
  userId
}: PostCommentItemProps) {
  const { showToast } = useToastService()

  const { removeComment } = usePostCommentRemove(postId, {
    onSuccess: () => {
      showToast({
        message: 'Comentário deletado',
        position: 'bottom'
      })
    },

    onError: () => {
      showToast({
        message: 'Não foi possível deletar comentário',
        type: 'error',
        position: 'bottom'
      })
    }
  })

  const isAllowToRemove = postCommentService.isAllowToRemove(
    postComment,
    userId,
    postAuthorId
  )

  function handleConfirmRemove() {
    Alert.alert('Deseja excluir o comentáiro', 'pressione confirmar', [
      {
        text: 'Confirmar',
        onPress: () => removeComment(postComment.id)
      },
      {
        text: 'Cancelar',
        style: 'cancel'
      }
    ])
  }

  return (
    <Pressable
      disabled={!isAllowToRemove}
      onLongPress={handleConfirmRemove}
      testID='post-comment-id'
    >
      <Box mb='s16' flexDirection='row' alignItems='center' gap='s12'>
        <ProfileAvatar imageURL={postComment.author.profileURL} />

        <Box flex={1}>
          <Text preset='paragraphSmall' bold>
            {postComment.author.userName}
          </Text>

          <Text preset='paragraphSmall' color='gray1'>
            {postComment.message} {' - '}
            {postComment.createdAtRelative}
          </Text>
        </Box>
      </Box>
    </Pressable>
  )
}
