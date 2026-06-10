import { Link } from 'react-router-dom'
import { useBlogs } from '../stores/blogStore'

const BlogList = ({ addLike, removeBlog, user }) => {
  const blogs = useBlogs()
  // throw new Error("simulated error");

  return (
    <>
      <h2>blogs</h2>
      {blogs.map((blog) => (
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
