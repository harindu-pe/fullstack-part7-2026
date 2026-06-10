import { create } from 'zustand'

let timeoutId // track the timer outside the store

const useNotificationStore = create((set) => ({
  message: null,
  isError: false,
  setNotification: (message, isError, seconds) => {
    clearTimeout(timeoutId) // cancel any existing timer first
    set({ message, isError })
    timeoutId = setTimeout(() => {
      set({ message: null })
    }, seconds * 1000)
  },
}))

export default useNotificationStore
