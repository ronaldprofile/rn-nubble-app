import { useNavigation } from '@react-navigation/native'
import { Box, Icon, Text, TouchableOpacityBox } from '@components'
import { ScreenProps } from '../Screen'

type ScreenHeaderProps = Pick<ScreenProps, 'withGoBack' | 'title'>

const ICON_SIZE = 20
export function ScreenHeader({ title, withGoBack }: ScreenHeaderProps) {
  const navigation = useNavigation()

  return (
    <Box
      mb='s24'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
    >
      {withGoBack && (
        <TouchableOpacityBox
          flexDirection='row'
          alignItems='center'
          onPress={navigation.goBack}
        >
          <Icon size={ICON_SIZE} name='arrowLeft' color='primary' />
          {!title && (
            <Text preset='paragraphMedium' ml='s8' semiBold>
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}

      {title && <Text preset='headingSmall'>{title}</Text>}
      {title && <Box width={ICON_SIZE} />}
    </Box>
  )
}
