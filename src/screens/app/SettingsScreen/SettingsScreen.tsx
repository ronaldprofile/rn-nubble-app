import { Button, Screen, Text } from '@components'
import { useAuthSignOut } from '@domain'
import { AppScreenProps } from '@routes'
import { useToastService } from '@services'

export function SettingsScreen({
  navigation
}: AppScreenProps<'SettingsScreen'>) {
  const { showToast } = useToastService()

  const { signOut, isLoading } = useAuthSignOut({
    onError: error => showToast({ message: error, type: 'error' })
  })

  return (
    <Screen withGoBack title='Configurações'>
      <Button
        title='Sair da conta'
        onPress={() => signOut()}
        loading={isLoading}
      />
    </Screen>
  )
}
