import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Screen, Text, Button, FormTextInput } from '@components'
import { useResetNavigationSuccess } from '@hooks'
import {
  forgotPasswordSchema,
  ForgotPasswordSchema
} from './forgot-password-schema'
import { AuthScreenProps, AuthStackParamList } from '@routes'
import { useAuthRequestNewPassword } from '@domain'
import { useToastService } from '@services'

const resetParam: AuthStackParamList['SuccessScreen'] = {
  title: 'Enviamos as instruções para seu e-mail',
  description: 'Clique no link enviado no seu e-mail para recuperar sua senha',
  icon: {
    name: 'messageRound',
    color: 'primary'
  }
}

export function ForgotPasswordScreen(
  props: AuthScreenProps<'ForgotPasswordScreen'>
) {
  const { reset } = useResetNavigationSuccess()
  const { showToast } = useToastService()

  const { requestNewPassword, isLoading } = useAuthRequestNewPassword({
    onSuccess: () => reset(resetParam),
    onError: message => showToast({ message, type: 'error' })
  })

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  })

  function handleSubmitForm(formValues: ForgotPasswordSchema) {
    requestNewPassword(formValues.email)
  }

  return (
    <Screen withGoBack>
      <Text preset='headingLarge'>Esqueci minha senha</Text>

      <Text preset='paragraphLarge' mt='s16'>
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>

      <FormTextInput
        control={control}
        name='email'
        label='E-mail'
        placeholder='Digite seu e-mail'
        boxProps={{
          mt: 's32'
        }}
      />

      <Button
        loading={isLoading}
        title='Recuperar senha'
        mt='s48'
        onPress={handleSubmit(handleSubmitForm)}
      />
    </Screen>
  )
}
