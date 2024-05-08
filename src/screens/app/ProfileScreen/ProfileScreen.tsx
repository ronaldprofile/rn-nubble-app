import {
  ActivityIndicator,
  Box,
  ProfileAvatar,
  Screen,
  Text
} from '@components'
import { useUserGetById } from '@domain'
import { AppScreenProps } from '@routes'
import { RefreshControl, ScrollView } from 'react-native'

export function ProfileScreen({ route }: AppScreenProps<'ProfileScreen'>) {
  const userId = route.params.userId

  const { user, isLoading, isError, isFetching, refetch } =
    useUserGetById(userId)

  return (
    <Screen withGoBack flex={1}>
      {isLoading && <ActivityIndicator />}

      {isError && <Text>Erro ao carregar perfil do usuário</Text>}

      {user && (
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          }
        >
          <Box alignItems='center'>
            <ProfileAvatar
              imageURL={user.profileUrl}
              size={64}
              borderRadius={24}
            />

            <Text preset='paragraphMedium' bold>
              {user.fullName}
            </Text>

            <Text>@{user.username}</Text>
          </Box>
        </ScrollView>
      )}
    </Screen>
  )
}
