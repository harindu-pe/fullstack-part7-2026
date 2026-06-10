import { create } from 'zustand'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { getUser, removeUser, saveUser } from '../services/persistentUser'
import useNotificationStore from './notificationStore'

const useUserStore = create((set) => ({
  user: null,
  actions: {
    initializeUser: async () => {
      const loggedUserJSON = getUser()
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
        set(() => ({
          user,
        }))
      }
    },
    doLogin: async ({ username, password }) => {
      try {
        const user = await loginService.login({ username, password })
        saveUser(user)
        blogService.setToken(user.token)
        set(() => ({
          user,
        }))
      } catch (error) {
        useNotificationStore
          .getState()
          .setNotification('wrong username or password', true, 5)
      }
    },
    doLogout: async () => {
      removeUser()
      set(() => ({ user: null }))
    },
  },
}))

export const useUser = () => useUserStore((state) => state.user)
export const useUserActions = () => useUserStore((state) => state.actions)
