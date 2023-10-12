import { create } from 'zustand'
import { ToastService } from './toastTypes'

const useToastStore = create<ToastService>(set => ({
  toast: null,
  showToast: toast => set({ toast }),
  hideToast: () => set({ toast: null })
}))

export const useToastZustand = () => useToastStore(state => state.toast)

export function useToastServiceZustand(): Pick<
  ToastService,
  'showToast' | 'hideToast'
> {
  const showToast = useToastStore(state => state.showToast)
  const hideToast = useToastStore(state => state.hideToast)

  return {
    showToast,
    hideToast
  }
}
