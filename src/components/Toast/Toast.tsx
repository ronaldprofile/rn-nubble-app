import { Animated } from 'react-native'

import { ToastPosition, useToast, useToastService } from '@services'
import { useCallback, useEffect, useRef } from 'react'
import { ToastContent } from './components/ToastContent'

const DURATION = 2000

export function Toast() {
  const toast = useToast()
  const { hideToast } = useToastService()

  const fadeAnimation = useRef(new Animated.Value(0)).current

  const runEnteringAnimation = useCallback(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start()
  }, [fadeAnimation])

  const runExitingAnimation = useCallback(
    (callbackFn: Animated.EndCallback) => {
      Animated.timing(fadeAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start(callbackFn)
    },
    [fadeAnimation]
  )

  useEffect(() => {
    if (toast) {
      runEnteringAnimation()

      setTimeout(
        () => runExitingAnimation(hideToast),
        toast.duration || DURATION
      )
    }
  }, [toast])

  if (!toast) return null

  const position: ToastPosition = toast?.position || 'top'

  return (
    <Animated.View
      style={{
        position: 'absolute',
        alignSelf: 'center',
        opacity: fadeAnimation,
        [position]: 100
      }}
    >
      <ToastContent toast={toast} />
    </Animated.View>
  )
}
