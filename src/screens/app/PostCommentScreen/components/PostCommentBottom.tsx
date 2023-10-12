import { Text } from '@components'
import { Pressable } from 'react-native'

interface PostCommentBottomProps {
  hasNextPage: boolean
  fetchDataNextPage: () => void
}

export function PostCommentBottom({
  hasNextPage,
  fetchDataNextPage
}: PostCommentBottomProps) {
  if (hasNextPage) {
    return (
      <Pressable onPress={fetchDataNextPage}>
        <Text bold color='primary' textAlign='center'>
          Ver mais
        </Text>
      </Pressable>
    )
  }

  return null
}
