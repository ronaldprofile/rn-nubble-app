import { Screen, Text } from '@components'
import { AppTabScreenProps } from '@routes'

export function NewPostScreen(props: AppTabScreenProps<'NewPostScreen'>) {
  return (
    <Screen>
      <Text preset='headingLarge'>New post</Text>
    </Screen>
  )
}
