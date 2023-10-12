import { PropsWithChildren, createContext, useState } from 'react'
import { Toast, ToastService } from '../toastTypes'

export const ToastContext = createContext<ToastService>({} as ToastService)

export function ToastProvider({ children }: PropsWithChildren) {
  const [toast, setToast] = useState<ToastService['toast']>(null)

  function showToast(_toast: Toast) {
    setToast(_toast)
  }

  function hideToast() {
    setToast(null)
  }

  return (
    <ToastContext.Provider
      value={{
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}
