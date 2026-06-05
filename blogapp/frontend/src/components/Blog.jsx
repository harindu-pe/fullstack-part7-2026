import { useState } from "react";
import Togglable from "./Togglable";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

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
        <div>{blog.likes}</div>
        <div>{blog.author}</div>
      </div>
    </div>
  );
};

export default Blog;
