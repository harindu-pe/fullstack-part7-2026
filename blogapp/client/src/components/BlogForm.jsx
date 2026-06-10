import { Button, Stack, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'
import { useBlogActions } from '../stores/blogStore'

const BlogForm = ({ createBlog }) => {
  const titleField = useField('text')
  const authorField = useField('text')
  const urlField = useField('text')

  const { reset: contentTitle, ...title } = titleField
  const { reset: contentAuthor, ...author } = authorField
  const { reset: contentUrl, ...url } = urlField

  const { create } = useBlogActions()

  const navigation = useNavigate()

  const handleCreateNew = (event) => {
    event.preventDefault()
    create({
      title: titleField.value,
      author: authorField.value,
      url: urlField.value,
    })

    titleField.reset()
    authorField.reset()
    urlField.reset()

    navigation('/')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <Stack spacing={2} sx={{ maxWidth: 400 }}>
          <TextField label="title" size="small" {...title} />
          <TextField label="author" size="small" {...author} />
          <TextField label="url" size="small" {...url} />
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
