import { Post } from '@domain'
import { Dimensions, Image } from 'react-native'

type PostImageProps = Pick<Post, 'imageURL'>
export function PostImage({ imageURL }: PostImageProps) {
  return (
    <Image
      source={{ uri: imageURL }}
      resizeMode='cover'
      style={{
        width: Dimensions.get('screen').width,
        height: 300,
        marginHorizontal: -24
      }}
    />
  )
}
