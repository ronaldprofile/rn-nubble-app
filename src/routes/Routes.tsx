import { NavigationContainer } from '@react-navigation/native'

import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'
import { useAuthCrendentials } from '@services'
import { ActivityIndicator, Box } from '@components'

export function Router() {
  const { authCredentials, isLoading } = useAuthCrendentials()

  if (isLoading) {
    return (
      <Box
        flex={1}
        backgroundColor='background'
        justifyContent='center'
        alignItems='center'
      >
        <ActivityIndicator size='large' />
      </Box>
    )
  }

  return (
    <NavigationContainer>
      {authCredentials ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
