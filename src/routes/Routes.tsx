import { NavigationContainer } from '@react-navigation/native'

import { AppStack } from './AppStack'
import { AuthStack } from './AuthStack'
import { useAuthCrendentials } from '@services'

export function Router() {
  const { authCredentials } = useAuthCrendentials()

  return (
    <NavigationContainer>
      {authCredentials ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  )
}
