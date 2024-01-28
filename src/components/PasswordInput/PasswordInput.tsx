import { useState } from 'react'
import { TextInput, TextInputProps, Icon } from '@components'

export type PasswordInputProps = Omit<TextInputProps, 'RightComponent'>

export function PasswordInput(props: PasswordInputProps) {
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true)

  function handleToggleSecureTextEntry() {
    setIsSecureTextEntry(prevState => !prevState)
  }

  const iconName = isSecureTextEntry ? 'eyeOn' : 'eyeOff'

  return (
    <TextInput
      {...props}
      secureTextEntry={isSecureTextEntry}
      RightComponent={
        <Icon
          name={iconName}
          color='gray2'
          onPress={handleToggleSecureTextEntry}
        />
      }
    />
  )
}
