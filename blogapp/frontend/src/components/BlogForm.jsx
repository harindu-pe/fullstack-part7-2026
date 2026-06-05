import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ notifyWith, blogFormRef }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateNew = async (event) => {
    event.preventDefault();
    const createdBlog = await blogService.create({ title, author, url });
    notifyWith(
      `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
      false,
    );
    setTitle("");
    setAuthor("");
    setUrl("");
    blogFormRef.current.toggleVisibility();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateNew}>
        <div>
          <div>
            <label>
              title
              <input
                placeholder="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author
              <input
                placeholder="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url
              <input
                placeholder="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
