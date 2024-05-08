import {
  Box,
  PressableBox,
  PressableBoxProps,
  ProfileAvatar,
  ProfileAvatarProps,
  Text
} from '@components'
import { User } from '@domain'
import { useNavigation } from '@react-navigation/native'
import { GestureResponderEvent } from 'react-native'

type ProfileUserProps = {
  user: Pick<User, 'id' | 'profileUrl' | 'username'>
  avatarProps?: Omit<Partial<ProfileAvatarProps>, 'imageURL'>
  RightComponent?: React.ReactElement
} & PressableBoxProps

export function ProfileUser({
  user,
  onPress,
  avatarProps,
  RightComponent,
  ...restProps
}: ProfileUserProps) {
  const navigation = useNavigation()

  function handleOnPress(event: GestureResponderEvent) {
    if (onPress) {
      onPress(event)
    }

    navigation.navigate('ProfileScreen', {
      userId: user.id
    })
  }

  return (
    <PressableBox
      mb='s16'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      onPress={handleOnPress}
      {...restProps}
    >
      <Box flexDirection='row' alignItems='center' gap='s12'>
        <ProfileAvatar {...avatarProps} imageURL={user.profileUrl} />

        <Text preset='paragraphMedium' semiBold>
          {user.username}
        </Text>
      </Box>

      {RightComponent}
    </PressableBox>
  )
}
