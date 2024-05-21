import { useNavigation } from '@react-navigation/native'
import { Box, BoxProps, Icon, Text, TouchableOpacityBox } from '@components'
import { ScreenProps } from '../Screen'

type ScreenHeaderProps = Pick<
  ScreenProps,
  'withGoBack' | 'title' | 'HeaderComponent'
> &
  BoxProps

const ICON_SIZE = 20

export function ScreenHeader({
  title,
  withGoBack,
  HeaderComponent,
  ...boxStyles
}: ScreenHeaderProps) {
  const navigation = useNavigation()

  if (!title && !withGoBack && !HeaderComponent) return null

  const showBackLabel = !title && !HeaderComponent

  return (
    <Box
      mb='s24'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      {...boxStyles}
    >
      {withGoBack && (
        <TouchableOpacityBox
          testID='screen-back-button'
          flexDirection='row'
          alignItems='center'
          mr='s10'
          onPress={navigation.goBack}
        >
          <Icon size={ICON_SIZE} name='arrowLeft' color='primary' />

          {showBackLabel && (
            <Text preset='paragraphMedium' ml='s8' semiBold>
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}

      {HeaderComponent}

      {title && <Text preset='headingSmall'>{title}</Text>}
      {title && <Box width={ICON_SIZE} />}
    </Box>
  )
}
