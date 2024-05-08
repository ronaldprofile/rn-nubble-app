import { Box, Icon, ProfileUser, Text } from '@components'
import { User } from '@domain'
import { useSearchHistory, useSearchHistoryService } from '@services'
import { FlatList, ListRenderItemInfo } from 'react-native'

export function SearchHistory() {
  const userList = useSearchHistory()

  const { removeUser } = useSearchHistoryService()

  function renderItem({ item }: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        user={item}
        avatarProps={{ size: 48 }}
        RightComponent={
          <Icon
            name='trash'
            color='primary'
            onPress={() => removeUser(item.id)}
          />
        }
      />
    )
  }

  return (
    <Box>
      <FlatList
        data={userList}
        renderItem={renderItem}
        keyExtractor={item => item.username}
        ListHeaderComponent={
          <Text preset='headingMedium' mb='s16'>
            Buscas recentes
          </Text>
        }
      />
    </Box>
  )
}
