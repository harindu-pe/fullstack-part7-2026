const Notification = ({ notification }) => {
  const { message } = notification

  if (!message) {
    return null
  }

  return <div>{message}</div>
}

export default Notification
