import { useState } from "react";
import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, addLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  if (!blog) {
    return null;
  }

  const showWhenVisible = { display: visible ? "" : "none" };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={() => addLike(blog)} style={{ marginLeft: 5 }}>
            like
          </button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>
  );
};

export default Blog;
