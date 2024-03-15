import { Box, Screen } from '@components'
import { PostComment, usePostCommentList } from '@domain'
import { AppScreenProps } from '@routes'
import { FlatList, ListRenderItemInfo, Platform, ViewStyle } from 'react-native'
import { PostCommentItem } from './components/PostCommentItem'
import { PostCommentBottom } from './components/PostCommentBottom'
import { useAppSafeArea } from '@hooks'
import { PostCommentTextMessage } from './components/PostCommentTextMessage'
import { useAuthCrendentials } from '@services'

export function PostCommentScreen({
  route
}: AppScreenProps<'PostCommentScreen'>) {
  const postId = route.params.postId
  const postAuthorId = route.params.postAuthorId

  const {
    list: postCommentList,
    hasNextPage,
    fetchNextPage
  } = usePostCommentList(postId)

  const { userId } = useAuthCrendentials()

  const { bottom } = useAppSafeArea()

  function renderPostItem({ item }: ListRenderItemInfo<PostComment>) {
    return (
      <PostCommentItem
        postId={postId}
        postComment={item}
        userId={userId}
        postAuthorId={postAuthorId}
      />
    )
  }

  const flatListStyle: ViewStyle = {
    paddingBottom: Platform.OS === 'android' ? bottom * 2 : bottom
  }

  return (
    <Screen flex={1} withGoBack title='Comentários'>
      <Box flex={1} justifyContent='space-between'>
        <FlatList
          data={postCommentList}
          renderItem={renderPostItem}
          keyExtractor={postComment => postComment.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={flatListStyle}
          ListFooterComponent={
            <PostCommentBottom
              hasNextPage={hasNextPage}
              fetchDataNextPage={fetchNextPage}
            />
          }
        />

        <PostCommentTextMessage postId={postId} />
      </Box>
    </Screen>
  )
}
