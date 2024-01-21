import React from 'react'
import {
  ActivityIndicator as RNActivityIndicator,
  ActivityIndicatorProps as RNActivityIndicatorProps
} from 'react-native'
import { ThemeColors } from '../../theme'
import { useAppTheme } from '@hooks'

type ActivityIndicatorProps = RNActivityIndicatorProps & {
  color?: ThemeColors
}

export function ActivityIndicator({
  color = 'primary',
  ...rest
}: ActivityIndicatorProps) {
  const { colors } = useAppTheme()

  return (
    <RNActivityIndicator
      testID='activity-indicator'
      color={colors[color]}
      {...rest}
    />
  )
}
