import { create } from 'zustand'
import blogService from '../services/blogs'
import useNotificationStore from './notificationStore'

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const blogs = await blogService.getAll()
      set(() => ({ blogs }))
    },
    create: async (blog) => {
      try {
        const newBlog = await blogService.create(blog)
        set((state) => {
          const blogs = state.blogs.concat(newBlog)
          return { blogs }
        })
      } catch (error) {
        useNotificationStore
          .getState()
          .setNotification(`error.message`, true, 5)
      }
    },
  },
}))

export const useBlogs = () => {
  const blogs = useBlogStore((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return sortedBlogs
}

export const useBlogActions = () => useBlogStore((state) => state.actions)
