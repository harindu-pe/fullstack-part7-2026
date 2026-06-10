import { Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBlogActions } from '../stores/blogStore'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const { create } = useBlogActions()

  const navigation = useNavigate()

  const handleCreateNew = (event) => {
    event.preventDefault()
    create({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
    navigation('/')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField
            label="title"
            size="small"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            label="author"
            size="small"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            label="url"
            size="small"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ alignSelf: 'flex-start' }}
          >
            create
          </Button>
        </Stack>
      </form>
    </div>
  )
}

export default BlogForm
