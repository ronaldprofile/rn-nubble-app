import { Box, Text, TouchableOpacityBox } from '@components'
import { Post } from '@domain'
import { useNavigation } from '@react-navigation/native'

type PostBottomProps = Pick<Post, 'author' | 'text' | 'commentCount' | 'id'>

export function PostBottom({
  author,
  commentCount,
  text,
  id
}: PostBottomProps) {
  const commentText = getCommentText(commentCount)

  const navigation = useNavigation()

  function handleNavigateToPostComment() {
    navigation.navigate('PostCommentScreen', {
      postId: id,
      postAuthorId: author.id
    })
  }

  return (
    <Box mt='s16'>
      <Text bold preset='paragraphMedium'>
        {author.userName}
      </Text>

      <Text preset='paragraphMedium' color='gray1'>
        {text}
      </Text>

      {commentText && (
        <TouchableOpacityBox mt='s8'>
          <Text
            onPress={handleNavigateToPostComment}
            preset='paragraphSmall'
            bold
            color='primary'
          >
            {commentText}
          </Text>
        </TouchableOpacityBox>
      )}
    </Box>
  )
}

function getCommentText(commentCount: number): string | null {
  if (commentCount === 0) {
    return null
  } else if (commentCount === 1) {
    return 'ver comentário'
  } else {
    return `ver ${commentCount} comentários`
  }
}
