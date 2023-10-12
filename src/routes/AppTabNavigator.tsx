import {
  BottomTabBarProps,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { HomeScreen } from '@screens'
import { FavoriteScreen, MyProfileScreen, NewPostScreen } from '@screens'
import { AppTabBar } from './AppTabBar'

export type AppTabBottomTabsParamList = {
  HomeScreen: undefined
  FavoriteScreen: undefined
  MyProfileScreen: undefined
  NewPostScreen: undefined
}

const Tab = createBottomTabNavigator<AppTabBottomTabsParamList>()

export function AppTabNavigator() {
  function renderTabBar(props: BottomTabBarProps) {
    return <AppTabBar {...props} />
  }

  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
      <Tab.Screen name='NewPostScreen' component={NewPostScreen} />
      <Tab.Screen name='FavoriteScreen' component={FavoriteScreen} />
      <Tab.Screen name='MyProfileScreen' component={MyProfileScreen} />
    </Tab.Navigator>
  )
}
