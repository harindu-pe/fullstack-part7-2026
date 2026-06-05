import { useEffect, useState, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const notifyWith = (message, isError = false) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification({ message: null });
    }, 5000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  if (user === null) {
    return <Login setUser={setUser} />;
  }

  return (
    <div>
      <Notification notification={notification} />

      <h2>blogs</h2>
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>log out</button>
        </p>
      </div>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm notifyWith={notifyWith} blogFormRef={blogFormRef} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
