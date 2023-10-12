export type ToastType = 'success' | 'error'
export type ToastPosition = 'top' | 'bottom'

export interface Toast {
  type?: ToastType
  position?: ToastPosition
  message: string
  duration?: number
  action?: {
    title: string
    onPress: () => void
  }
}

export interface ToastService {
  toast: Toast | null
  showToast: (toast: Toast) => void
  hideToast: () => void
}
