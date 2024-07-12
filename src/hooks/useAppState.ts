import { useEffect, useState } from 'react'
import { AppState } from 'react-native'

export function useAppState() {
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    const event = AppState.addEventListener('change', state => {
      setAppState(state)
    })

    return event.remove
  }, [])

  return appState
}
