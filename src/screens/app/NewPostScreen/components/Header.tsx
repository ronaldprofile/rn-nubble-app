import { Box, Button, Icon, Text } from '@components'
import { useNavigation } from '@react-navigation/native'
import { ImageBackground } from 'react-native'

interface Props {
  imageUri?: string
  imageWidth: number
}

export function Header({ imageUri, imageWidth }: Props) {
  const navigation = useNavigation()

  function navigatetoPublishPost() {
    if (imageUri) {
      navigation.navigate('PublishPostScreen', {
        imageUri
      })
    }
  }

  return (
    <Box>
      <ImageBackground
        source={{ uri: imageUri }}
        style={{
          width: imageWidth,
          height: imageWidth,
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        {Boolean(imageUri) && (
          <Button
            title='Escolher essa'
            mb='s24'
            preset='ghost'
            onPress={navigatetoPublishPost}
          />
        )}
      </ImageBackground>

      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        px='s24'
        py='s16'
      >
        <Text preset='headingSmall'>Sua galeria</Text>
        <Icon name='camera' />
      </Box>
    </Box>
  )
}
