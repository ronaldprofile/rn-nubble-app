import { Box, BoxProps, Icon } from '@components'
import { useAppSafeArea } from '@hooks'
import { SimpleLogo } from '@brand'

export function HomeHeader() {
  const { top } = useAppSafeArea()

  return (
    <Box
      {...$container}
      style={{
        paddingTop: top
      }}
    >
      <SimpleLogo width={70} />

      <Box flexDirection='row' alignItems='center' gap='s24'>
        <Icon name='search' />
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
