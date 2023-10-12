import { Box } from '@components'
import { Post } from '@domain'
import { PostHeader } from './PostHeader'
import { PostImage } from './PostImage'
import { PostActions } from './PostActions'
import { PostBottom } from './PostBottom'

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  return (
    <Box mb='s24' px='s24'>
      <PostHeader author={post.author} />
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
