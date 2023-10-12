import {
  Box,
  BoxProps,
  Icon,
  IconProps,
  Text,
  TextProps,
  TouchableOpacityBox,
  TouchableOpacityBoxProps
} from '@components'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { AppTabBottomTabsParamList } from './AppTabNavigator'
import { useAppSafeArea } from '@hooks'
import { $shadowProps } from '@theme'

type TabProp = {
  label: string
  icon: {
    focused: IconProps['name']
    unfocused: IconProps['name']
  }
}

const mapTabProps: Record<keyof AppTabBottomTabsParamList, TabProp> = {
  HomeScreen: {
    label: 'Início',
    icon: {
      focused: 'homeFill',
      unfocused: 'home'
    }
  },
  NewPostScreen: {
    label: 'Novo post',
    icon: {
      focused: 'newPost',
      unfocused: 'newPost'
    }
  },
  FavoriteScreen: {
    label: 'Favoritos',
    icon: {
      focused: 'bookmarkFill',
      unfocused: 'bookmark'
    }
  },
  MyProfileScreen: {
    label: 'Meu perfil',
    icon: {
      focused: 'profileFill',
      unfocused: 'profile'
    }
  }
}

export function AppTabBar({
  state,
  descriptors,
  navigation
}: BottomTabBarProps) {
  const { bottom } = useAppSafeArea()

  return (
    <Box
      {...$boxWrapper}
      style={[
        {
          paddingBottom: bottom
        },
        $shadowProps
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const tab = mapTabProps[route.name as keyof AppTabBottomTabsParamList]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({
              name: route.name,
              params: route.params,
              merge: true
            })
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          })
        }

        return (
          <TouchableOpacityBox
            {...$itemWrapper}
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <Icon
              name={isFocused ? tab.icon.focused : tab.icon.unfocused}
              color={isFocused ? 'primary' : 'backgroundContrast'}
            />

            <Text
              {...$label}
              color={isFocused ? 'primary' : 'backgroundContrast'}
            >
              {tab.label}
            </Text>
          </TouchableOpacityBox>
        )
      })}
    </Box>
  )
}

const $label: TextProps = {
  semiBold: true,
  marginTop: 's4',
  preset: 'paragraphCaption'
}

const $itemWrapper: TouchableOpacityBoxProps = {
  activeOpacity: 1,
  flex: 1,
  alignItems: 'center',
  accessibilityRole: 'button'
}

const $boxWrapper: BoxProps = {
  paddingTop: 's12',
  backgroundColor: 'background',
  flexDirection: 'row'
}
