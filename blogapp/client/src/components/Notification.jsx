import { Alert } from '@mui/material'
import useNotificationStore from '../stores/notificationStore'

const Notification = () => {
  const message = useNotificationStore((state) => state.message)
  const isError = useNotificationStore((state) => state.isError)

  if (!message) {
    return null
  }

  return (
    <Alert severity={isError ? 'error' : 'success'} sx={{ my: 2 }}>
      {message}
    </Alert>
  )
}

export default Notification
