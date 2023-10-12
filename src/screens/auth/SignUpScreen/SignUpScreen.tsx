import { Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Button,
  Screen,
  Text,
  FormPasswordInput,
  FormTextInput
} from '@components'

import { useResetNavigationSuccess } from '@hooks'

import { signUpSchema, SignUpSchema } from './signup-schema'
import { AuthScreenProps } from '@routes'

export function SignUpScreen(props: AuthScreenProps<'SignUpScreen'>) {
  const { reset } = useResetNavigationSuccess()

  const { handleSubmit, control, formState } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      username: ''
    }
  })

  function handleSubmitForm(data: SignUpSchema) {
    Alert.alert(JSON.stringify(data))

    // reset({
    //   title: "Sua conta foi criada com sucesso!",
    //   description: "Agora é só fazer login na nossa plataforma",
    //   icon: {
    //     name: "checkRound",
    //     color: "success"
    //   }
    // });
  }

  return (
    <Screen withGoBack scrollable>
      <Text preset='headingLarge' mb='s32'>
        Criar uma conta
      </Text>

      <FormTextInput
        control={control}
        name='username'
        label='Seu username'
        placeholder='@'
        autoCapitalize='words'
        boxProps={{
          mb: 's16'
        }}
      />

      <FormTextInput
        control={control}
        name='fullName'
        label='Nome completo'
        placeholder='Digite seu nome completo'
        boxProps={{
          mb: 's16'
        }}
      />

      <FormTextInput
        control={control}
        name='email'
        label='E-mail'
        placeholder='Digite seu e-mail'
        boxProps={{
          mb: 's16'
        }}
      />

      <FormPasswordInput
        control={control}
        name='password'
        placeholder='Digite sua senha'
        label='Senha'
        boxProps={{
          mb: 's16'
        }}
      />

      <Button
        // disabled={!formState.isValid}
        onPress={handleSubmit(handleSubmitForm)}
        mt='s48'
        title='Criar minha conta'
      />
    </Screen>
  )
}
