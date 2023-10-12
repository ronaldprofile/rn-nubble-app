import { useNavigation } from '@react-navigation/native'
import { AuthStackParamList } from '@routes'

export function useResetNavigationSuccess() {
  const navigation = useNavigation()

  function reset(params: AuthStackParamList['SuccessScreen']) {
    const { title, description, icon } = params

    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'LoginScreen'
        },
        {
          name: 'SuccessScreen',
          params: {
            title,
            description,
            icon
          }
        }
      ]
    })
  }

  return {
    reset
  }
}
