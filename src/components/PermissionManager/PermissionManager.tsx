import {
  ActivityIndicator,
  Box,
  Button,
  Screen,
  Text,
  TextProps
} from '@components'
import { PermissionName, usePermission } from '@services'
import { Linking, Platform } from 'react-native'

interface PermissionManagerProps {
  permissionName: PermissionName
  description: string
  children: React.ReactElement
}

export function PermissionManager({
  children,
  permissionName,
  description
}: PermissionManagerProps) {
  const { status, loading } = usePermission(permissionName)

  if (status === 'granted') {
    return children
  }

  return (
    <Screen withGoBack flex={1}>
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Text preset='headingSmall' textAlign='center'>
          {description}
        </Text>

        {loading && <ActivityIndicator color='primary' />}

        {status === 'unavailable' && (
          <Text {...$messageStyle}>
            Esse recurso está indisponível para esse dispositivo
          </Text>
        )}

        {status === 'never_ask_again' && (
          <Box>
            {Platform.OS === 'android' && (
              <Text {...$messageStyle}>
                É necessário abrir e fechar o App novamente após alterar as
                configurações
              </Text>
            )}

            <Button
              title='Abrir configurações'
              mt='s32'
              onPress={Linking.openSettings}
            />
          </Box>
        )}
      </Box>
    </Screen>
  )
}

const $messageStyle: TextProps = {
  preset: 'paragraphMedium',
  color: 'error',
  bold: true,
  marginVertical: 's16',
  textAlign: 'center'
}
