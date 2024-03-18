import { server, mockedPostComment, resetInMemoryResponse } from '@test'
import {
  act,
  fireEvent,
  renderScreen,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from 'test-utils'
import { PostCommentScreen } from '../../PostCommentScreen'
import { authCredentialsStorage } from '@services'
import { Alert, AlertButton } from 'react-native'

beforeAll(() => {
  server.listen()
  jest.useFakeTimers()
})

afterEach(() => {
  server.resetHandlers()
  resetInMemoryResponse()
})

afterAll(() => {
  server.close()
  jest.useRealTimers()
})

describe('integration: PostCommentScreen', () => {
  test('when ADDING a comment, the list is automatically updated', async () => {
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

    const comment = await screen.findByText(/comentário aleatório/i)

    expect(comment).toBeTruthy()

    const inputText = screen.getByPlaceholderText(/Adicione um comentário/i)

    fireEvent.changeText(inputText, 'um shape asthectic.')

    fireEvent.press(screen.getByText(/Enviar/i))

    const newComment = await screen.findByText(/um shape asthectic./i)
    expect(newComment).toBeTruthy()

    const comments = await screen.findAllByTestId('post-comment-id')

    expect(comments.length).toBe(3)
  })

  test('when DELETING a comment, the list is automatically updated and a toast message is displayed', async () => {
    jest
      .spyOn(authCredentialsStorage, 'get')
      .mockResolvedValue(mockedPostComment.mateusAuthCredentials)

    let mockedConfirm: AlertButton['onPress']

    const mockedAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation((title, message, buttons) => {
        if (buttons && buttons[0]) {
          mockedConfirm = buttons[0].onPress
        }
      })

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

    const comment = await screen.findByText(
      mockedPostComment.mateusPostCommentAPI.message,
      { exact: false }
    )

    expect(comment).toBeTruthy()

    fireEvent(comment, 'longPress')
    expect(mockedAlert).toHaveBeenCalled()

    mockedConfirm && mockedConfirm()

    await waitForElementToBeRemoved(() =>
      screen.getByText(mockedPostComment.mateusPostCommentAPI.message, {
        exact: false
      })
    )

    const comments = await screen.findAllByTestId('post-comment-id')

    expect(comments.length).toBe(1)

    await waitFor(() =>
      expect(screen.getByTestId('toast-message')).toBeTruthy()
    )

    act(() => jest.runAllTimers())

    expect(screen.queryByTestId('toast-message')).toBeNull()
  })
})
