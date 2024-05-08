import { Icon, ProfileUser, Screen, Text, TextInput } from '@components'
import { User, useUserSearch } from '@domain'
import { useDebounce } from '@hooks'
import { AppScreenProps } from '@routes'
import { useState } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import { SearchHistory } from './components/SearchHistory'
import { useSearchHistoryService } from '@services'

export function SearchScreen({}: AppScreenProps<'SearchScreen'>) {
  const { addUser } = useSearchHistoryService()

  const [search, setSearch] = useState('')

  const debouncedSearch = useDebounce(search)

  const { list } = useUserSearch(debouncedSearch)

  function renderItem({ item }: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        user={item}
        onPress={() => addUser(item)}
        avatarProps={{
          size: 48
        }}
      />
    )
  }

  const searchEmpty = search.length === 0

  return (
    <Screen
      withGoBack
      HeaderComponent={
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder='Digite sua busca'
          LeftComponent={<Icon color='gray3' name='search' />}
        />
      }
    >
      {searchEmpty ? (
        <SearchHistory />
      ) : (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item.username}
        />
      )}
    </Screen>
  )
}
