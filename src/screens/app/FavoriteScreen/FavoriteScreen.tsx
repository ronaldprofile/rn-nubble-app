import { Screen, Text } from '@components'
import { AppTabScreenProps } from '@routes'

export function FavoriteScreen(props: AppTabScreenProps<'FavoriteScreen'>) {
  return (
    <Screen>
      <Text preset='headingLarge'>Favorites</Text>
    </Screen>
  )
}
