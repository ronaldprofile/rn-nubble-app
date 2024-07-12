import { Box, Icon, PermissionManager } from '@components'
import { useAppSafeArea, useAppState } from '@hooks'
import { useIsFocused } from '@react-navigation/native'
import { AppScreenProps } from '@routes'
import { useRef, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import {
  Camera,
  Templates,
  useCameraDevice,
  useCameraFormat
} from 'react-native-vision-camera'

const CAMERA_VIEW = Dimensions.get('screen').width
const CONTROL_HEIGHT = (Dimensions.get('screen').height - CAMERA_VIEW) / 2
const CONTROL_DIFF = 30

export function CameraScreen({ navigation }: AppScreenProps<'CameraScreen'>) {
  const { top } = useAppSafeArea()

  const [isReady, setIsReady] = useState(false)
  const [flashOn, setFlashOn] = useState(false)

  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera'
    ]
  })

  const cameraRef = useRef<Camera>(null)

  const cameraFormat = useCameraFormat(device, Templates.Instagram)

  const isFocused = useIsFocused()
  const appState = useAppState()

  const isActive = isFocused && appState === 'active'

  function toggleFlash() {
    setFlashOn(prevState => !prevState)
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current?.takePhoto({
        flash: flashOn ? 'on' : 'off',
        qualityPrioritization: 'quality'
      })

      navigation.navigate('PublishPostScreen', {
        imageUri: `file://${photo.path}`
      })
    }
  }

  return (
    <PermissionManager
      permissionName='camera'
      description='Permita o Nubble App acessar a camera'
    >
      <Box flex={1}>
        <Box backgroundColor='grayWhite' style={StyleSheet.absoluteFill} />

        {device != null && (
          <Camera
            ref={cameraRef}
            photo
            enableHighQualityPhotos
            format={cameraFormat}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            onInitialized={() => setIsReady(true)}
          />
        )}

        <Box flex={1} justifyContent='space-between'>
          <Box
            flexDirection='row'
            justifyContent='space-between'
            backgroundColor='black60'
            height={CONTROL_HEIGHT - CONTROL_DIFF}
            style={{ paddingTop: top }}
            px='s24'
          >
            <Icon
              size={20}
              name='arrowLeft'
              color='grayWhite'
              onPress={navigation.goBack}
            />
            <Icon
              size={20}
              name={flashOn ? 'flashOn' : 'flashOff'}
              color='grayWhite'
              onPress={toggleFlash}
            />
            <Box width={20} />
          </Box>

          <Box
            backgroundColor='black60'
            height={CONTROL_HEIGHT + CONTROL_DIFF}
            alignItems='center'
            justifyContent='center'
          >
            {isReady && (
              <Icon
                size={80}
                name='cameraClick'
                color='grayWhite'
                onPress={takePhoto}
              />
            )}
          </Box>
        </Box>
      </Box>
    </PermissionManager>
  )
}
