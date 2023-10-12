import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from './AppStack'
import { AuthStackParamList } from './AuthStack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { AppTabBottomTabsParamList } from './AppTabNavigator'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList, AppStackParamList {}
  }
}

export type AppScreenProps<RouteName extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, RouteName>

export type AuthScreenProps<RouteName extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, RouteName>

export type AppTabScreenProps<
  RouteName extends keyof AppTabBottomTabsParamList
> = CompositeScreenProps<
  BottomTabScreenProps<AppTabBottomTabsParamList, RouteName>,
  NativeStackScreenProps<AppStackParamList, 'AppTabNavigator'>
>
