import { useState } from "react";

const Blog = ({ blog, addLike, currentUser, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  if (!blog) {
    return null;
  }

  const canBeRemoved = () =>
    currentUser && currentUser.username === blog.user.username;

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog);
    }
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title}
        <div>{blog.author}</div>
        <button onClick={() => setVisible(!visible)}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          <div>likes {blog.likes}</div>
          {currentUser && (
            <button onClick={() => addLike(blog)} style={{ marginLeft: 5 }}>
              like
            </button>
          )}
        </div>
        {canBeRemoved() && (
          <button onClick={handleRemove} style={{ marginLeft: 5 }}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
