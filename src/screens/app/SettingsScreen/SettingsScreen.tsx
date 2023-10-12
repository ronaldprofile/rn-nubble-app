import { Button, Screen, Text } from '@components'
import { AppScreenProps } from '@routes'

export function SettingsScreen({
  navigation
}: AppScreenProps<'SettingsScreen'>) {
  return (
    <Screen withGoBack>
      <Text preset='headingLarge'>Settings Screen</Text>
      <Button
        title='New post'
        onPress={() =>
          navigation.navigate('AppTabNavigator', {
            screen: 'NewPostScreen'
          })
        }
      />
    </Screen>
  )
}
