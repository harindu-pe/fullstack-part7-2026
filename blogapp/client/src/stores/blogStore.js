import { create } from 'zustand'
import blogService from '../services/blogs'
import useNotificationStore from './notificationStore'

const useBlogStore = create((set) => ({
  blogs: [],
  actions: {
    initializeBlogs: async () => {
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
        useNotificationStore.getState().setNotification(error.message, true, 5)
      }
    },
    addLike: async (blog) => {
      const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
      try {
        const updatedBlog = await blogService.update(newBlog)
        set((state) => {
          const blogs = state.blogs.map((b) =>
            b.id === blog.id ? updatedBlog : b
          )
          return { blogs }
        })
      } catch (error) {
        useNotificationStore.getState().setNotification(error.message, true, 5)
      }
    },
    removeBlog: async (blog) => {
      try {
        await blogService.remove(blog.id)
        set((state) => {
          const blogs = state.blogs.filter((b) => b.id !== blog.id)
          return { blogs }
        })
        useNotificationStore
          .getState()
          .setNotification(
            `Blog ${blog.title} by ${blog.author} removed`,
            false,
            5
          )
      } catch (error) {
        useNotificationStore.getState().setNotification(error.message, true, 5)
      }
    },
    addComment: async (id, comment) => {
      try {
        const updatedBlog = await blogService.addComment(id, comment)
        set((state) => ({
          blogs: state.blogs.map(
            (b) => (b.id === id ? { ...updatedBlog, user: b.user } : b) // ← preserve b.user
          ),
        }))
      } catch (error) {
        useNotificationStore.getState().setNotification(error.message, true, 5)
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
