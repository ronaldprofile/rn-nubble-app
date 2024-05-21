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
  noPaddingHorizontal?: boolean
  HeaderComponent?: React.ReactNode
}

export function Screen({
  children,
  withGoBack = false,
  scrollable = false,
  noPaddingHorizontal = false,
  title,
  style,
  HeaderComponent,
  ...boxProps
}: ScreenProps) {
  const { top, bottom } = useAppSafeArea()
  const { colors } = useAppTheme()

  const Container = scrollable ? ScrollViewContainer : ViewContainer
  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : undefined

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={keyboardBehavior}>
      <Container backgroundColor={colors.background}>
        <Box
          px={noPaddingHorizontal ? undefined : 's24'}
          style={[
            {
              paddingTop: top,
              paddingBottom: bottom
            },
            style
          ]}
          {...boxProps}
        >
          <ScreenHeader
            HeaderComponent={HeaderComponent}
            withGoBack={withGoBack}
            title={title}
            px={noPaddingHorizontal ? 's24' : undefined}
          />

          {children}
        </Box>
      </Container>
    </KeyboardAvoidingView>
  )
}
