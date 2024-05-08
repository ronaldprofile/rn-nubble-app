import { Image } from 'react-native'

export interface ProfileAvatarProps {
  imageURL: string
  size?: number
  borderRadius?: number
}

export function ProfileAvatar({
  /** @default 32 */
  size = 32,
  imageURL,
  /** @default 14 */
  borderRadius = 14
}: ProfileAvatarProps) {
  return (
    <Image
      source={{ uri: imageURL }}
      style={{
        width: size,
        height: size,
        borderRadius
      }}
    />
  )
}
