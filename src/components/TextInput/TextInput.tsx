import { useRef } from 'react'
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle
} from 'react-native'
import { Text, $fontFamily, $fontSizes, Box, BoxProps } from '@components'
import { useAppTheme } from '@hooks'

export interface TextInputProps extends RNTextInputProps {
  label: string
  errorMessage?: string
  RightComponent?: React.ReactElement
  boxProps?: BoxProps
}

export function TextInput({
  label,
  errorMessage,
  RightComponent,
  boxProps,
  ...rest
}: TextInputProps) {
  const { colors } = useAppTheme()

  const inputRef = useRef<RNTextInput>(null)

  function focusInput() {
    inputRef?.current?.focus()
  }

  const $inputContainerStyle: BoxProps = {
    padding: 's16',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: errorMessage ? 2 : 1,
    borderColor: errorMessage ? 'error' : 'gray4',
    borderRadius: 's12'
  }

  const $inputStyle: TextStyle = {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: $fontFamily.regular,
    ...$fontSizes.paragraphMedium
  }

  return (
    <Box {...boxProps}>
      <Pressable onPress={focusInput}>
        <Text
          mb='s4'
          preset='paragraphMedium'
          semiBold
          color='backgroundContrast'
        >
          {label}
        </Text>

        <Box {...$inputContainerStyle}>
          <RNTextInput
            ref={inputRef}
            autoCapitalize='none'
            style={$inputStyle}
            placeholderTextColor={colors.gray2}
            {...rest}
          />

          {RightComponent && (
            <Box ml='s16' justifyContent='center'>
              {RightComponent}
            </Box>
          )}
        </Box>

        {errorMessage && (
          <Text mt='s4' preset='paragraphSmall' color='error' bold>
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Box>
  )
}
