import { AppStack } from '@routes'
import { authCredentialsStorage } from '@services'
import { mockUtils, server, userMocked } from '@test'
import { act, fireEvent, renderScreen, screen } from 'test-utils'

jest.unmock('@react-navigation/native')

beforeAll(() => {
  server.listen()
  jest.useFakeTimers()
  jest
    .spyOn(authCredentialsStorage, 'get')
    .mockResolvedValue(mockUtils.mateusAuthCredentials)
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
  jest.useRealTimers()
  jest.resetAllMocks()
})

describe('integration: SearchScreen', () => {
  test('Search flow', async () => {
    // 1- navigate to Search Screen
    renderScreen(<AppStack initialRouteName='SearchScreen' />)

    // 2- find the search input and type user name
    const inputSearch = screen.getByPlaceholderText(/digite sua busca/i)
    fireEvent.changeText(inputSearch, 'mar')

    act(() => jest.runAllTimers())

    // 3- find thow users as per the MSW mock
    const user1 = await screen.findByText(userMocked.user1.username)
    expect(user1).toBeTruthy()

    const user2 = await screen.findByText(userMocked.user2.username)
    expect(user2).toBeTruthy()

    // 4- select the user1 and navigate to Profile Screen
    fireEvent(user1, 'press')

    // 5- expect to be at the Profile Screen with user1 loaded
    const userFullName = await screen.findByText(userMocked.user1.full_name)
    expect(userFullName).toBeTruthy()

    // 6- press the back button to navigate to Search Screen
    const screenBackButton = screen.getByTestId('screen-back-button')
    fireEvent.press(screenBackButton)

    // 7- clean the search input
    const inputSearchAfterBack =
      screen.getByPlaceholderText(/digite sua busca/i)
    fireEvent.changeText(inputSearchAfterBack, '')
    act(() => jest.runAllTimers())

    // 8- make sure the search history section appears
    const searchHistoryTitle = screen.getByText(/buscas recentes/i)
    expect(searchHistoryTitle).toBeTruthy()

    // 9- the user1 (pressed) was the saved in the search history
    const user1AfterBack = screen.queryByText(userMocked.user1.username)
    expect(user1AfterBack).toBeTruthy()

    // 10- the user2 (NOT pressed) must NOT appear in the search history
    const user2AfterBack = screen.queryByText(userMocked.user2.username)
    expect(user2AfterBack).toBeFalsy()

    // 11- remove user1 from search history by pressing the trash icon
    const trashIcon = screen.getByTestId('trash')
    fireEvent.press(trashIcon)

    // 12- make sure the user1 was removed from the search history
    const user1AfterRemoved = screen.queryByText(userMocked.user1.username)
    expect(user1AfterRemoved).toBeFalsy()
  })
})
