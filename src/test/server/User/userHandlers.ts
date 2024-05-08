import { BASE_URL, PageDataApi } from '@api'
import { USER_PATH, UserApi } from '@domain'
import { HttpResponse, http } from 'msw'
import { userMocked } from './mocks'

const PATH = `${BASE_URL}/${USER_PATH}`

export const userHandlers = [
  http.get(PATH, async () => {
    const response: PageDataApi<UserApi> = userMocked.mockedUserResponse
    return HttpResponse.json(response, { status: 200 })
  }),

  http.get<{ userId: string }>(`${PATH}/:userId`, async ({ params }) => {
    const user = userMocked.userList.find(
      us => us.id.toString() === params.userId
    )
    return HttpResponse.json(user, { status: 200 })
  })
]
