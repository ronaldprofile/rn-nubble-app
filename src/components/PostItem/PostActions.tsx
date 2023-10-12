import { Box, Icon, IconProps, Text, TouchableOpacityBox } from '@components'
import { Post } from '@domain'

type PostActionsProps = Pick<
  Post,
  'commentCount' | 'favoriteCount' | 'reactionCount'
>

export function PostActions({
  commentCount,
  favoriteCount,
  reactionCount
}: PostActionsProps) {
  return (
    <Box mt='s16' flexDirection='row' gap='s24'>
      <PostActionItem
        onPress={() => {}}
        text={reactionCount}
        icon={{
          default: 'heart',
          marked: 'heartFill'
        }}
      />
      <PostActionItem
        onPress={() => {}}
        text={commentCount}
        icon={{
          default: 'comment',
          marked: 'comment'
        }}
      />
      <PostActionItem
        onPress={() => {}}
        text={favoriteCount}
        icon={{
          default: 'bookmark',
          marked: 'bookmarkFill'
        }}
      />
    </Box>
  )
}

interface PostActionItemProps {
  onPress: () => void
  marked?: boolean
  text: number
  icon: {
    default: IconProps['name']
    marked: IconProps['name']
  }
}

function PostActionItem({
  icon,
  marked = false,
  text,
  onPress
}: PostActionItemProps) {
  const iconName = marked ? icon.marked : icon.default
  return (
    <TouchableOpacityBox
      onPress={onPress}
      flexDirection='row'
      alignItems='center'
      gap='s4'
    >
      <Icon name={iconName} color={marked ? 'market' : undefined} />
      {text > 0 && (
        <Text bold preset='paragraphSmall'>
          {text}
        </Text>
      )}
    </TouchableOpacityBox>
  )
}
