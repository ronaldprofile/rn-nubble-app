import { Box, ProfileAvatar, Text } from '@components'
import { Post } from '@domain'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'

type PostHeaderProps = Pick<Post, 'author'>

export function PostHeader({ author }: PostHeaderProps) {
  const navigation = useNavigation()

  function handleNavigateToProfile() {
    navigation.navigate('ProfileScreen', {
      userId: author.id
    })
  }

  return (
    <Pressable onPress={handleNavigateToProfile}>
      <Box mb='s16' flexDirection='row' alignItems='center' gap='s12'>
        <ProfileAvatar imageURL={author.profileURL} />

        <Text preset='paragraphMedium' semiBold>
          {author.userName}
        </Text>
      </Box>
    </Pressable>
  )
}
