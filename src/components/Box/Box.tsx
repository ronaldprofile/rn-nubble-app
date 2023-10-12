import { TouchableOpacity, TouchableOpacityProps } from "react-native";
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
} from "@shopify/restyle";
import { Theme } from "../../theme";

export const Box = createBox<Theme>();
export type BoxProps = React.ComponentProps<typeof Box>;

export type TouchableOpacityBoxProps = BackgroundColorProps<Theme> &
  SpacingProps<Theme> &
  BorderProps<Theme> &
  LayoutProps<Theme> &
  SpacingShorthandProps<Theme> &
  TouchableOpacityProps;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [backgroundColor, layout, border, spacingShorthand, spacing],
  TouchableOpacity
);
