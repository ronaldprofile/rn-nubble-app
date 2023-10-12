import { IconBaseProps } from '@components'
import React from 'react'
import { Svg, Path } from 'react-native-svg'

export function ArrowLeftIcon({ color = 'black', size = 20 }: IconBaseProps) {
  return (
    <Svg width={size} height={size} fill='none' viewBox='0 0 20 20'>
      <Path
        fill={color}
        fillRule='evenodd'
        d='M9.7 16.603c-.512.53-1.343.53-1.856 0l-5.46-5.644a1.389 1.389 0 010-1.918l5.46-5.644a1.282 1.282 0 011.857 0c.512.53.512 1.389 0 1.919L6.48 8.643h10.207C17.412 8.643 18 9.252 18 10c0 .75-.588 1.357-1.312 1.357H6.48l3.22 3.327a1.39 1.39 0 010 1.919z'
        clipRule='evenodd'
      ></Path>
    </Svg>
  )
}
