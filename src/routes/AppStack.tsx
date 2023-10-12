import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PostCommentScreen, ProfileScreen, SettingsScreen } from '@screens'
import { AppTabBottomTabsParamList, AppTabNavigator } from './AppTabNavigator'
import { NavigatorScreenParams } from '@react-navigation/native'

export type AppStackParamList = {
  AppTabNavigator: NavigatorScreenParams<AppTabBottomTabsParamList>
  SettingsScreen: undefined
  PostCommentScreen: {
    postId: number
    postAuthorId: number
  }

  ProfileScreen: {
    userId: number
  }
}

const Stack = createNativeStackNavigator<AppStackParamList>()

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true
      }}
    >
      <Stack.Screen name='AppTabNavigator' component={AppTabNavigator} />
      <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
      <Stack.Screen name='PostCommentScreen' component={PostCommentScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
    </Stack.Navigator>
  )
}
