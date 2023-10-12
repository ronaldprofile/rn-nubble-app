import { IconBaseProps } from '@components'
import React from 'react'
import { Svg, Path } from 'react-native-svg'

export function ArrowRightIcon({ color = 'black', size = 20 }: IconBaseProps) {
  return (
    <Svg width={size} height={size} fill='none' viewBox='0 0 20 20'>
      <Path
        fill={color}
        fillRule='evenodd'
        d='M10.3 3.397a1.282 1.282 0 011.855 0l5.46 5.644c.513.53.513 1.388 0 1.918l-5.46 5.644c-.512.53-1.343.53-1.855 0a1.389 1.389 0 010-1.919l3.22-3.327H3.311C2.588 11.357 2 10.748 2 10c0-.75.588-1.357 1.312-1.357H13.52L10.3 5.316a1.389 1.389 0 010-1.919z'
        clipRule='evenodd'
      ></Path>
    </Svg>
  )
}
