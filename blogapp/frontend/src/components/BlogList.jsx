import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, addLike, removeBlog, user }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <>
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          removeBlog={removeBlog}
          currentUser={user}
        />
      ))}
    </>
  );
};

export default BlogList;
