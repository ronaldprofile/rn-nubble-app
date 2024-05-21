import { Button, Screen, Text, TextInput } from '@components'
import { AppScreenProps } from '@routes'
import { useState } from 'react'
import { Dimensions, Image } from 'react-native'

const IMAGE_WIDTH = Dimensions.get('screen').width / 2

export function PublishPostScreen({
  route
}: AppScreenProps<'PublishPostScreen'>) {
  const [description, setDescription] = useState('')

  return (
    <Screen withGoBack title='Novo post'>
      <Image
        source={{ uri: route.params.imageUri }}
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_WIDTH,
          alignSelf: 'center',
          marginTop: 20
        }}
      />

      <Text preset='headingSmall' mt='s32' mb='s10'>
        Escreva uma legenda
      </Text>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder='Digite algo...'
        containerProps={{
          borderWidth: 0
        }}
      />

      <Button title='Publicar post' mt='s56' />
    </Screen>
  )
}
