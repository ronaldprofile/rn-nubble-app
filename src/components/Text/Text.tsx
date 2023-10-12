import React from "react";
import { TextStyle } from "react-native";

import { createText } from "@shopify/restyle";
import { Theme } from "../../theme";

const SRText = createText<Theme>();
type SRTextProps = React.ComponentProps<typeof SRText>;

export type TextProps = SRTextProps & {
  preset?: TextFontSizesVariants;
  bold?: boolean;
  italic?: boolean;
  semiBold?: boolean;
};

export function Text({
  children,
  preset = "paragraphMedium",
  style,
  bold = false,
  italic = false,
  semiBold = false,
  ...rest
}: TextProps) {
  const textStyle = $fontSizes[preset];
  const textFontFamily = handleGetFontFamily(preset, bold, italic, semiBold);

  return (
    <SRText
      color="backgroundContrast"
      style={[textStyle, { fontFamily: textFontFamily }, style]}
      {...rest}
    >
      {children}
    </SRText>
  );
}

type TextFontSizesVariants =
  | "headingLarge"
  | "headingMedium"
  | "headingSmall"
  | "paragraphLarge"
  | "paragraphMedium"
  | "paragraphSmall"
  | "paragraphCaption"
  | "paragraphCaptionSmall";

export const $fontSizes: Record<TextFontSizesVariants, TextStyle> = {
  headingLarge: { fontSize: 32, lineHeight: 38.4 },
  headingMedium: { fontSize: 22, lineHeight: 26.4 },
  headingSmall: { fontSize: 18, lineHeight: 23.4 },

  paragraphLarge: { fontSize: 18, lineHeight: 25.2 },
  paragraphMedium: { fontSize: 16, lineHeight: 22.4 },
  paragraphSmall: { fontSize: 14, lineHeight: 19.6 },

  paragraphCaption: { fontSize: 12, lineHeight: 16.8 },
  paragraphCaptionSmall: { fontSize: 10, lineHeight: 14 }
};

function handleGetFontFamily(
  preset: TextFontSizesVariants,
  bold: boolean,
  italic: boolean,
  semiBold: boolean
) {
  if (
    preset === "headingLarge" ||
    preset === "headingMedium" ||
    preset === "headingSmall"
  ) {
    return italic ? $fontFamily.blackItalic : $fontFamily.black;
  }

  switch (true) {
    case bold && italic:
      return $fontFamily.boldItalic;

    case bold:
      return $fontFamily.bold;

    case italic:
      return $fontFamily.italic;

    case semiBold && italic:
      return $fontFamily.mediumItalic;

    case semiBold:
      return $fontFamily.medium;

    default:
      return $fontFamily.regular;
  }
}

export const $fontFamily = {
  black: "Satoshi-Black",
  blackItalic: "Satoshi-BlackItalic",

  bold: "Satoshi-Bold",
  boldItalic: "Satoshi-BoldItalic",

  italic: "Satoshi-Italic",

  light: "Satoshi-Light",
  lightItalic: "Satoshi-LightItalic",

  medium: "Satoshi-Medium",
  mediumItalic: "Satoshi-MediumItalic",
  regular: "Satoshi-Regular"
};
