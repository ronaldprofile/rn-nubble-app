import { Box, BoxProps, Icon } from '@components'
import { useAppSafeArea } from '@hooks'
import { SimpleLogo } from '@brand'
import { useNavigation } from '@react-navigation/native'

export function HomeHeader() {
  const { top } = useAppSafeArea()

  const navigation = useNavigation()

  function navigateToSearchScreen() {
    navigation.navigate('SearchScreen')
  }

  return (
    <Box {...$container} style={{ paddingTop: top }}>
      <SimpleLogo width={70} />

      <Box flexDirection='row' alignItems='center' gap='s24'>
        <Icon name='search' onPress={navigateToSearchScreen} />
        <Icon name='bell' />
        <Icon name='chat' />
      </Box>
    </Box>
  )
}

const $container: BoxProps = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 's24',
  paddingBottom: 's24'
}
