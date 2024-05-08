import {
  TouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
  PressableProps as RNPressableProps
} from 'react-native'
import {
  createBox,
  createRestyleComponent,
  backgroundColor,
  layout,
  border,
  spacing,
  BackgroundColorProps,
  SpacingProps,
  BorderProps,
  LayoutProps,
  spacingShorthand,
  SpacingShorthandProps
} from '@shopify/restyle'
import { Theme } from '../../theme'

export const Box = createBox<Theme>()
export type BoxProps = React.ComponentProps<typeof Box>

type RestyleType = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  SpacingShorthandProps<Theme>

export type TouchableOpacityBoxProps = RNTouchableOpacityProps & RestyleType
export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [backgroundColor, layout, border, spacingShorthand, spacing],
  TouchableOpacity
)

export type PressableBoxProps = RNPressableProps & RestyleType
export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
  [backgroundColor, layout, border, spacingShorthand, spacing],
  TouchableOpacity
)
