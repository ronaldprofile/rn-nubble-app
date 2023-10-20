import { Box, Icon, ProfileAvatar, Screen, Text } from '@components'
import { AppTabScreenProps } from '@routes'
import { useAuthCrendentials } from '@services'

export function MyProfileScreen({
  navigation
}: AppTabScreenProps<'MyProfileScreen'>) {
  const { authCredentials } = useAuthCrendentials()

  const user = authCredentials?.user

  function navigateToProfileSettings() {
    navigation.navigate('SettingsScreen')
  }

  return (
    <Screen>
      {user && (
        <Box>
          <Icon name='settings' onPress={navigateToProfileSettings} />

          <Box alignItems='center'>
            <ProfileAvatar
              imageURL={user?.profileUrl || ''}
              size={64}
              borderRadius={24}
            />

            <Text preset='headingMedium' mt='s16' mb='s4'>
              {user?.fullName}
            </Text>

            <Text preset='paragraphLarge'>@{user?.username}</Text>
          </Box>
        </Box>
      )}
    </Screen>
  )
}
