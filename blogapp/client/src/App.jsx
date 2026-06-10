import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import PageNotFound from './components/PageNotFound'
import ShowError from './components/ShowError'
import blogService from './services/blogs'
import loginService from './services/login'
import { useBlogActions } from './stores/blogStore'
import useNotificationStore from './stores/notificationStore'

const App = () => {
  const { initialize } = useBlogActions()

  const [user, setUser] = useState(null)
  const setNotification = useNotificationStore((state) => state.setNotification)

  const navigation = useNavigate()

  useEffect(() => {
    initialize()
  }, [initialize])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const notifyWith = (message, isError = false) => {
    const seconds = 5
    setNotification(message, isError, seconds)
  }

  const doLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      navigation('/')
    } catch {
      notifyWith('wrong username or password', true)
      console.log('wrong credentials')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigation('/')
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
          >
            blogs
          </Button>
          {!user ? (
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
            >
              login
            </Button>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/create"
                sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                new blog
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
              >
                logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Notification />
      <ShowError>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/login" element={<Login doLogin={doLogin} />} />
          <Route path="/blogs/:id" element={<Blog currentUser={user} />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ShowError>
    </Container>
  )
}

export default App
