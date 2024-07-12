import { PermissionManager, Screen } from '@components'
import { AppTabScreenProps } from '@routes'
import { useCameraRoll, usePermission } from '@services'
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable
} from 'react-native'
import { Header } from './components/Header'
import { useRef, useState } from 'react'

const SCREEN_WIDTH = Dimensions.get('screen').width
const NUM_COLUMNS = 4
const ITEM_WIDTH = SCREEN_WIDTH / NUM_COLUMNS

export function NewPostScreen(props: AppTabScreenProps<'NewPostScreen'>) {
  const [selectedImage, setSelectedImage] = useState<string>()

  const permission = usePermission('photoLibrary')
  const { photoList, fetchNextPage } = useCameraRoll(
    permission.status === 'granted',
    setSelectedImage
  )

  const flatListRef = useRef<FlatList>(null)

  function onSelectImage(imageUri: string) {
    setSelectedImage(imageUri)
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  function renderItem({ item }: ListRenderItemInfo<string>) {
    return (
      <Pressable onPress={() => onSelectImage(item)}>
        <Image
          source={{ uri: item }}
          style={{ width: ITEM_WIDTH, height: ITEM_WIDTH }}
        />
      </Pressable>
    )
  }

  return (
    <PermissionManager
      permissionName='photoLibrary'
      description='Permita o Nubble App acessar as imagens da sua galeria'
    >
      <Screen withGoBack title='Novo post' noPaddingHorizontal>
        <FlatList
          ref={flatListRef}
          data={photoList}
          renderItem={renderItem}
          numColumns={4}
          ListHeaderComponent={
            <Header imageUri={selectedImage} imageWidth={SCREEN_WIDTH} />
          }
          onEndReachedThreshold={0.1}
          onEndReached={fetchNextPage}
        />
      </Screen>
    </PermissionManager>
  )
}
