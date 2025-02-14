import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  CameraScreen,
  PostCommentScreen,
  ProfileScreen,
  PublishPostScreen,
  SearchScreen,
  SettingsScreen
} from '@screens'
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

  PublishPostScreen: {
    imageUri: string
  }

  SearchScreen: undefined
  CameraScreen: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>()

interface AppStackProps {
  initialRouteName?: keyof AppStackParamList
}

export function AppStack({
  initialRouteName = 'AppTabNavigator'
}: AppStackProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name='AppTabNavigator' component={AppTabNavigator} />
      <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
      <Stack.Screen name='PostCommentScreen' component={PostCommentScreen} />
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
      <Stack.Screen name='PublishPostScreen' component={PublishPostScreen} />
      <Stack.Screen name='CameraScreen' component={CameraScreen} />
    </Stack.Navigator>
  )
}
