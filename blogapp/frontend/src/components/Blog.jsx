import { useState } from "react";
import { useParams } from "react-router-dom";

const Blog = ({ blogs, addLike, currentUser, removeBlog }) => {
  const id = useParams().id;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  const blog = blogs.find((b) => b.id === id);

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
        <div>{blog.url}</div>
        <div>
          <span>likes {blog.likes}</span>
          {currentUser && (
            <button onClick={() => addLike(blog)} style={{ marginLeft: 5 }}>
              like
            </button>
          )}
        </div>
        <div>{blog.author}</div>
        {canBeRemoved() && <button onClick={handleRemove}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;
