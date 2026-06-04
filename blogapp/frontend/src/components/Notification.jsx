const Notification = ({ notification }) => {
  const { message, isError } = notification;

  if (!message) {
    return null;
  }

  return <alert>{message}</alert>;
};

export default Notification;
