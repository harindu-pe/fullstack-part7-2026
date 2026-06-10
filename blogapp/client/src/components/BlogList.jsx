import { Link } from 'react-router-dom'

const BlogList = ({ blogs, addLike, removeBlog, user }) => {
  // throw new Error("simulated error");
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <>
      <h2>blogs</h2>
      {sortedBlogs.map((blog) => (
        <Link
          key={blog.id}
          to={`/blogs/${blog.id}`}
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              padding: 5,
              border: 'solid',
              borderWidth: 1,
              marginBottom: 5,
            }}
          >
            {blog.title} by {blog.author}
          </div>
        </Link>
      ))}
    </>
  )
}

export default BlogList
