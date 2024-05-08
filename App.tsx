import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@shopify/restyle'
import { theme } from './src/theme'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Router } from './src/routes/Routes'
import { Toast } from '@components'
import { ToastProvider } from '@services'
import {
  initializeImplementationStorage,
  MMKVStorage
} from './src/services/storage'
import { AuthCredentialsProvider } from './src/services/authCredentials/Providers/AuthCredentialsProvider'

initializeImplementationStorage(MMKVStorage)

const queryClient = new QueryClient()

function App(): JSX.Element {
  return (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              <Router />
              <Toast />
            </ToastProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  )
}

export default App
