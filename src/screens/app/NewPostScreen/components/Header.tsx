import { Box, Button, Icon, Text } from '@components'
import { useNavigation } from '@react-navigation/native'
import { ImageBackground } from 'react-native'
import { images } from '@assets'

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

  function navigateToCamera() {
    navigation.navigate('CameraScreen')
  }

  return (
    <Box>
      <ImageBackground
        source={imageUri ? { uri: imageUri } : images.imagePlaceholder}
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
        <Icon name='camera' onPress={navigateToCamera} />
      </Box>
    </Box>
  )
}
