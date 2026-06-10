import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Notification from './components/Notification'
import PageNotFound from './components/PageNotFound'
import ShowError from './components/ShowError'
import { useBlogActions } from './stores/blogStore'
import { useUser, useUserActions } from './stores/userStore'

const App = () => {
  const navigation = useNavigate()

  const user = useUser()
  const { initializeUser, doLogout } = useUserActions()
  const { initializeBlogs } = useBlogActions()

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  useEffect(() => {
    initializeUser()
  }, [initializeUser])

  const handleLogout = async () => {
    doLogout()
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
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ShowError>
    </Container>
  )
}

export default App
