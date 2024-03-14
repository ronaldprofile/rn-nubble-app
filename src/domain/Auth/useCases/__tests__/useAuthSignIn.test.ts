import { useAuthSignIn } from '../useAuthSignIn'
import { renderHook, waitFor } from 'test-utils'
import { authService } from '../../authServices'
import { mockedAuthCredentials } from './mockedData/mocks'

const mockedSaveCredentials = jest.fn()

jest.mock('@services', () => {
  const originalModule = jest.requireActual('@services')
  return {
    ...originalModule,
    useAuthCrendentials: () => ({
      saveCredentials: mockedSaveCredentials
    })
  }
})

describe('useAuthSignIn', () => {
  it('saves credentials if the sign-in successfully', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockResolvedValueOnce(mockedAuthCredentials)

    const mockedOnSuccess = jest.fn()

    const { result } = renderHook(() =>
      useAuthSignIn({
        onSuccess: mockedOnSuccess
      })
    )

    result.current.signIn({ email: 'ronald@coffstack.com', password: '12345' })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(mockedSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials)
    expect(mockedOnSuccess).toHaveBeenCalledWith(mockedAuthCredentials)
  })

  it('calls the onError function with an message if sign-in fails', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockRejectedValue(new Error('invalid user'))

    const mockedOnError = jest.fn()

    const { result } = renderHook(() =>
      useAuthSignIn({
        onError: mockedOnError
      })
    )

    result.current.signIn({ email: 'ronald@coffstack.com', password: '12345' })
    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(mockedOnError).toHaveBeenCalledWith('invalid user')
  })
})
