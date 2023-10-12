import { Box, Text } from '@components'
import { useAppTheme } from '@hooks'
import { useRef } from 'react'
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle
} from 'react-native'

interface TextMessageProps extends RNTextInputProps {
  onPressSend: (message: string) => void
}

export function TextMessage({
  onPressSend,
  value,
  ...rnTextInputProps
}: TextMessageProps) {
  const { colors } = useAppTheme()

  const inputRef = useRef<RNTextInput>(null)

  function focusInput() {
    inputRef?.current?.focus()
  }

  const $inputStyle: TextStyle = {
    padding: 0
  }

  const sendIsDisabled = value?.trim().length === 0

  return (
    <Pressable onPress={focusInput}>
      <Box
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        paddingVertical='s14'
        paddingHorizontal='s16'
        bg='gray5'
        borderRadius='s12'
      >
        <RNTextInput
          ref={inputRef}
          style={[$inputStyle, { color: colors.gray1 }]}
          placeholderTextColor={colors.gray2}
          {...rnTextInputProps}
        />

        <Pressable
          disabled={sendIsDisabled}
          onPress={() => onPressSend(value || '')}
        >
          <Text bold color={sendIsDisabled ? 'gray2' : 'primary'}>
            Enviar
          </Text>
        </Pressable>
      </Box>
    </Pressable>
  )
}
