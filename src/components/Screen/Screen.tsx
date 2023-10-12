import { KeyboardAvoidingView, Platform } from 'react-native'
import { Box, BoxProps } from '@components'
import {
  ScrollViewContainer,
  ViewContainer
} from './components/ScreenContainer'

import { useAppTheme, useAppSafeArea } from '@hooks'
import { ScreenHeader } from './components/ScreenHeader'

export interface ScreenProps extends BoxProps {
  children: React.ReactNode
  withGoBack?: boolean
  scrollable?: boolean
  title?: string
}

export function Screen({
  children,
  withGoBack = false,
  scrollable = false,
  title,
  style,
  ...boxProps
}: ScreenProps) {
  const { top, bottom } = useAppSafeArea()
  const { colors } = useAppTheme()

  const Container = scrollable ? ScrollViewContainer : ViewContainer
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1
      }}
      behavior={keyboardBehavior}
    >
      <Container backgroundColor={colors.background}>
        <Box
          px='s24'
          style={[
            {
              paddingTop: top,
              paddingBottom: bottom
            },
            style
          ]}
          {...boxProps}
        >
          <ScreenHeader withGoBack={withGoBack} title={title} />

          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  )
}
