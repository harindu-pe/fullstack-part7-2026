const Notification = ({ notification }) => {
  const { message, isError } = notification;

  if (!message) {
    return null;
  }

  return <div>{message}</div>;
};

export default Notification;
