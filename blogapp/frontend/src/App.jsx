import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useMatch, useNavigate } from "react-router-dom";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null });

  const navigation = useNavigate();

  const match = useMatch("/blogs/:id");
  const blog = match ? blogs.find((b) => b.id === match.params.id) : null;

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
    navigation("/");
  };

  const doLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      navigation("/");
    } catch {
      notifyWith("wrong username or password", true);
      console.log("wrong credentials");
    }
  };

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(createdBlog));
      notifyWith(
        `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      );
      navigation("/");
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

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      notifyWith(`Blog ${blog.title} by ${blog.author} removed`);
      navigation("/");
    } catch (error) {
      console.log("Error while trying to delete a blog", error);
    }
  };

  return (
    <Container>
      <div>
        <Link to="/">blogs</Link>
        {user && (
          <Link to="/create" style={{ marginLeft: 10 }}>
            new blog
          </Link>
        )}
        <span style={{ marginLeft: 10 }}>
          {user !== null ? (
            <button onClick={handleLogout}>logout</button>
          ) : (
            <Link to="/login">login</Link>
          )}
        </span>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              addLike={addLike}
              removeBlog={removeBlog}
              user={user}
            />
          }
        />
        <Route path="/login" element={<Login doLogin={doLogin} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog
              blog={blog}
              addLike={addLike}
              removeBlog={removeBlog}
              currentUser={user}
            />
          }
        />
        <Route path="/create" element={<BlogForm createBlog={addBlog} />} />
      </Routes>
    </Container>
  );
};

export default App;
