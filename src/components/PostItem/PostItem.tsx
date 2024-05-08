import { Box, ProfileUser } from '@components'
import { Post } from '@domain'
import { PostImage } from './PostImage'
import { PostActions } from './PostActions'
import { PostBottom } from './PostBottom'

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Box mb='s24' px='s24'>
      <ProfileUser
        user={{
          id: post.author.id,
          username: post.author.userName,
          profileUrl: post.author.profileURL
        }}
      />

      <PostImage imageURL={post.imageURL} />
      <PostActions
        commentCount={post.commentCount}
        favoriteCount={post.favoriteCount}
        reactionCount={post.reactionCount}
      />

      <PostBottom
        id={post.id}
        author={post.author}
        text={post.text}
        commentCount={post.commentCount}
      />
    </Box>
  )
}
