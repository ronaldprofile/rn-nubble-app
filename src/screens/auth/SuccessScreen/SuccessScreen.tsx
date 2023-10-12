import { Button, Icon, Screen, Text } from '@components'

import { AuthScreenProps } from '@routes'

export function SuccessScreen({
  navigation,
  route
}: AuthScreenProps<'SuccessScreen'>) {
  const { title, description, icon } = route.params

  function handleGoBegin() {
    navigation.goBack()
  }

  return (
    <Screen>
      <Icon {...icon} />

      <Text preset='headingLarge' mt='s24'>
        {title}
      </Text>

      <Text preset='paragraphLarge' mt='s16'>
        {description}
      </Text>

      <Button title='Voltar ao início' mt='s40' onPress={handleGoBegin} />
    </Screen>
  )
}
