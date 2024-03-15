import { renderScreen } from 'test-utils'
import { PostCommentScreen } from '../../PostCommentScreen'

describe('integration: PostCommentScreen', () => {
  test('when ADDING a comment the list is automatically updated', () => {
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostCommentScreen',
          key: 'PostCommentScreen',
          params: {
            postAuthorId: 1,
            postId: 1
          }
        }}
      />
    )
  })
})
