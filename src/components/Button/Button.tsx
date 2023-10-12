import React from "react";
import {
  Text,
  ActivityIndicator,
  TouchableOpacityBoxProps,
  TouchableOpacityBox
} from "@components";

import { buttonPresets } from "./presets";
export type ButtonPreset = "primary" | "outline";

export interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  preset?: ButtonPreset;
  loading?: boolean;
}

export function Button({
  title,
  loading,
  preset = "primary",
  disabled,
  ...rest
}: ButtonProps) {
  const buttonPresetStyle = disabled ? "disabled" : "default";
  const buttonPreset = buttonPresets[preset][buttonPresetStyle];

  return (
    <TouchableOpacityBox
      height={50}
      paddingHorizontal="s20"
      alignItems="center"
      justifyContent="center"
      borderRadius="s16"
      disabled={disabled || loading}
      {...buttonPreset.container}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={buttonPreset.content} />
      ) : (
        <Text preset="paragraphMedium" bold color={buttonPreset.content}>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
