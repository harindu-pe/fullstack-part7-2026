import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { useBlogActions, useBlogs } from '../stores/blogStore'
import { useUser } from '../stores/userStore'

const Blog = () => {
  const [confirmOpen, setConfirmOpen] = useState(false)

  const navigation = useNavigate()

  const currentUser = useUser()
  const blogs = useBlogs()
  const { addLike, removeBlog } = useBlogActions()

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null

  if (!blog) {
    return null
  }

  const canBeRemoved = () =>
    currentUser && currentUser.username === blog.user.username

  const handleRemove = () => {
    removeBlog(blog)
    setConfirmOpen(false)
    navigation('/')
  }

  return (
    <Card sx={{ mt: 2, maxWidth: 600 }} className="blog">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          by {blog.author}
        </Typography>

        <Link
          href={blog.url}
          target="_blank"
          rel="noopener"
          display="block"
          sx={{ mb: 1 }}
        >
          {blog.url}
        </Link>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Added by {blog.user.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
          <Typography variant="body1">{blog.likes} likes</Typography>
          {currentUser && (
            <Button
              size="small"
              variant="outlined"
              onClick={() => addLike(blog)}
            >
              like
            </Button>
          )}
          {canBeRemoved() && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => setConfirmOpen(true)}
            >
              remove
            </Button>
          )}
        </Box>
      </CardContent>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Remove blog</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remove blog <strong>{blog.title}</strong> by {blog.author}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>cancel</Button>
          <Button onClick={handleRemove} color="error" variant="contained">
            remove
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default Blog
