import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });

  const blogFormRef = useRef();

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

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

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdBlog));
      notifyWith(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      );
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.log("Creating new blog failed:", error);
    }
  };

  const addLike = async (blog) => {
    console.log(blog);

    const newBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    try {
      const updatedBlog = await blogService.update(newBlog);
      setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
    } catch (error) {
      console.log("Error while trying to like a blog:", error);
    }
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
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addLike={addLike} />
      ))}
    </div>
  );
};

export default App;
