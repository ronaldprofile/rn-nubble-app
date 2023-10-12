import { Box, BoxProps, Icon, IconProps, Text } from '@components'
import { Toast, ToastType } from '@services'
import { $shadowProps } from '@theme'
import { Dimensions, TextStyle } from 'react-native'

const MAX_WIDTH = Dimensions.get('screen').width * 0.9

interface ToastContent {
  toast: Toast
}

export function ToastContent({ toast }: ToastContent) {
  const position: Required<Toast>['position'] = toast?.position || 'top'
  const type: ToastType = toast?.type || 'success'

  return (
    <Box {...$toastStyles} style={$shadowProps}>
      <Icon {...mapToTypeIcon[type]} size={32} />
      <Text style={$textToastStyle} preset='paragraphMedium' bold ml='s16'>
        {toast.message}
      </Text>
    </Box>
  )
}

const mapToTypeIcon: Record<ToastType, IconProps> = {
  success: {
    name: 'checkRound',
    color: 'success'
  },

  error: {
    name: 'errorRound',
    color: 'error'
  }
}

const $toastStyles: BoxProps = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'background',
  padding: 's16',
  borderRadius: 's16',
  opacity: 0.95,
  maxWidth: MAX_WIDTH
}

const $textToastStyle: TextStyle = {
  flexShrink: 1
}
