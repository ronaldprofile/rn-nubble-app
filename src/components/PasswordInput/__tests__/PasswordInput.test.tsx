import { fireEvent, render, screen } from 'test-utils'
import { PasswordInput } from '../PasswordInput'
import { IconProps } from '@components'

describe('<PasswordInput />', () => {
  it('starts with hidden password', () => {
    const mockedOnChange = jest.fn()

    render(
      <PasswordInput
        label='PasswordInput'
        placeholder='password'
        value='123456'
        onChangeText={mockedOnChange}
      />
    )

    const inputElement = screen.getByPlaceholderText(/password/)
    expect(inputElement.props.secureTextEntry).toBeTruthy()
  })

  test('when pressing the eye icon, it should show the password, and change to the eye off icon', () => {
    const mockedOnChange = jest.fn()

    render(
      <PasswordInput
        label='PasswordInput'
        placeholder='password'
        value='123456'
        onChangeText={mockedOnChange}
      />
    )

    const eyeOnIcon: IconProps['name'] = 'eyeOn'
    fireEvent.press(screen.getByTestId(eyeOnIcon))

    const eyeOffIcon: IconProps['name'] = 'eyeOff'
    const eyeOffIconElement = screen.getByTestId(eyeOffIcon)

    expect(eyeOffIconElement).toBeTruthy()

    const inputElement = screen.getByPlaceholderText(/password/)
    expect(inputElement.props.secureTextEntry).toBeFalsy()
  })
})
