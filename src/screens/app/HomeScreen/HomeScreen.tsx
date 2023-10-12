import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  ViewStyle
} from 'react-native'
import { PostItem, Screen } from '@components'
import { Post, usePostList } from '@domain'
import { AppTabScreenProps } from '@routes'
import { HomeHeader } from './components/HomeHeader'
import { HomeEmpty } from './components/HomeEmpty'
import { useScrollToTop } from '@react-navigation/native'
import { useRef } from 'react'

export function HomeScreen({}: AppTabScreenProps<'HomeScreen'>) {
  const {
    list: postList,
    isLoading,
    isError,
    refresh,
    fetchNextPage
  } = usePostList()

  const flatListRef = useRef<FlatList<Post>>(null)
  useScrollToTop(flatListRef)

  function renderPostItem({ item }: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />
  }

  return (
    <Screen style={$screenStyle}>
      <FlatList
        ref={flatListRef}
        data={postList}
        renderItem={renderPostItem}
        keyExtractor={post => post.id.toString()}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
        contentContainerStyle={{ flex: postList.length === 0 ? 1 : 0 }}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty loading={isLoading} error={isError} refetch={refresh} />
        }
      />
    </Screen>
  )
}

const $screenStyle: ViewStyle = {
  flex: 1,
  paddingTop: 0,
  paddingBottom: 0,
  paddingHorizontal: 0
}
