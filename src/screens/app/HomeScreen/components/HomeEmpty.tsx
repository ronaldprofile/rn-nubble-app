import { ActivityIndicator, Box, Button, Text } from '@components'

interface HomeEmptyProps {
  loading: boolean
  error: unknown
  refetch: () => void
}

export function HomeEmpty({ loading, error, refetch }: HomeEmptyProps) {
  let HomeEmptyComponent = (
    <Text bold preset='paragraphMedium'>
      Não há publicações no seu feed
    </Text>
  )

  if (loading) {
    HomeEmptyComponent = <ActivityIndicator color='primary' />
  }

  if (error) {
    HomeEmptyComponent = (
      <>
        <Text bold preset='paragraphMedium'>
          Não conseguimos exibir as informações.
        </Text>

        <Button
          mt='s16'
          title='Recarregar'
          preset='outline'
          onPress={refetch}
        />
      </>
    )
  }

  return (
    <Box flex={1} justifyContent='center' alignItems='center'>
      {HomeEmptyComponent}
    </Box>
  )
}
