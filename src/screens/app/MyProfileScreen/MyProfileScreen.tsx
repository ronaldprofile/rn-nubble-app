import { Screen, Text } from '@components'
import { AppTabScreenProps } from '@routes'

export function MyProfileScreen(props: AppTabScreenProps<'MyProfileScreen'>) {
  return (
    <Screen>
      <Text preset='headingLarge'>Profile</Text>
    </Screen>
  )
}
