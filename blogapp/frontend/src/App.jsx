import { useEffect, useRef, useState } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import loginService from "./services/login";
import blogService from "./services/blogs";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import BlogList from "./components/BlogList";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    navigate("/");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
      notifyWith(`Login succesful`);
      navigate("/");
    } catch (e) {
      console.log(e);
      console.log("wrong credentials");
      notifyWith(`Invalid username or password`, true);
    }
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

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
      notifyWith(`Blog ${blog.title} by ${blog.author} removed`);
    } catch (error) {
      console.log("Error while trying to delete a blog", error);
    }
  };

  // if (user === null) {
  //   return (
  //     <Login
  //       setUser={setUser}
  //       handleLogin={handleLogin}
  //       username={username}
  //       setUsername={setUsername}
  //       password={password}
  //       setPassword={setPassword}
  //       notification={notification}
  //     />
  //   );
  // }

  return (
    <>
      <div>
        <Link to="/">blogs</Link>
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
        <Route
          path="/login"
          element={
            <Login
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              notification={notification}
            />
          }
        />
      </Routes>
    </>
    // <div>
    //   <Notification notification={notification} />

    //   <div>
    //     <p>
    //       {user.name} logged in <button onClick={handleLogout}>log out</button>
    //     </p>
    //   </div>

    //   <Togglable buttonLabel="create new blog" ref={blogFormRef}>
    //     <BlogForm createBlog={addBlog} />
    //   </Togglable>
    // </div>
  );
};

export default App;
