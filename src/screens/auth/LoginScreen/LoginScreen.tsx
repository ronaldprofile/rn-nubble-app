import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Text,
  FormTextInput,
  FormPasswordInput,
  Button,
  Screen
} from '@components'

import { loginSchema, LoginSchema } from './login-schema'
import { AuthScreenProps } from '@routes'
import { useAuthSignIn } from '@domain'
import { useToastService } from '@services'

export function LoginScreen({ navigation }: AuthScreenProps<'LoginScreen'>) {
  const { showToast } = useToastService()

  const { signIn, isLoading } = useAuthSignIn({
    onError: message => showToast({ message, type: 'error' })
  })

  const { handleSubmit, control, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function handleSubmitForm({ email, password }: LoginSchema) {
    signIn({ email, password })
  }

  function handleGoSignUpScreen() {
    navigation.navigate('SignUpScreen')
  }

  function handleGoForgotPasswordScreen() {
    navigation.navigate('ForgotPasswordScreen')
  }

  return (
    <Screen>
      <Text mb='s8' preset='headingLarge'>
        Olá
      </Text>

      <Text mb='s40' preset='paragraphLarge'>
        Digite seu e-mail e senha para entrar
      </Text>

      <FormTextInput
        control={control}
        name='email'
        placeholder='Digite seu e-mail'
        label='E-mail'
        boxProps={{
          mb: 's20'
        }}
      />

      <FormPasswordInput
        control={control}
        name='password'
        placeholder='Digite sua senha'
        label='Senha'
      />

      <Text
        onPress={handleGoForgotPasswordScreen}
        mt='s8'
        color='primary'
        preset='paragraphSmall'
        bold
      >
        Esqueci minha senha
      </Text>

      <Button
        disabled={!formState.isValid}
        onPress={handleSubmit(handleSubmitForm)}
        title='Entrar'
        mt='s48'
        loading={isLoading}
      />

      <Button
        title='Criar conta'
        preset='outline'
        mt='s12'
        onPress={handleGoSignUpScreen}
      />
    </Screen>
  )
}
