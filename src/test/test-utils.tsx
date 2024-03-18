import React, { ReactElement } from 'react'
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook
} from '@testing-library/react-native'

import { theme } from '@theme'
import { ThemeProvider } from '@shopify/restyle'
import { NavigationContainer } from '@react-navigation/native'
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider
} from '@tanstack/react-query'
import { AuthCredentialsProvider } from '@services'
import { Toast } from '@components'

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity
    },
    mutations: {
      retry: false,
      cacheTime: Infinity
    }
  },
  logger: {
    log: console.log,
    warn: console.warn,
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error
  }
}

export function wrapAllProviders() {
  const queryClient = new QueryClient(queryClientConfig)

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>{children}</NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export function wrapScreenProviders() {
  const queryClient = new QueryClient(queryClientConfig)

  return ({ children }: { children: React.ReactNode }) => (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>{children}</NavigationContainer>
          <Toast />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  )
}

function customRender<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(component, { wrapper: wrapAllProviders(), ...options })
}

export function renderScreen<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(component, { wrapper: wrapScreenProviders(), ...options })
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
) {
  return renderHook(renderCallback, {
    wrapper: wrapAllProviders(),
    ...options
  })
}

export * from '@testing-library/react-native'

export { customRender as render }
export { customRenderHook as renderHook }
