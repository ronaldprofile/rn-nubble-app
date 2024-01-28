import React, { ReactElement } from 'react'
import { RenderOptions, render } from '@testing-library/react-native'

import { theme } from '@theme'
import { ThemeProvider } from '@shopify/restyle'
import { NavigationContainer } from '@react-navigation/native'

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  )
}

function customRender<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(component, { wrapper: AllTheProviders, ...options })
}

export * from '@testing-library/react-native'

export { customRender as render }
