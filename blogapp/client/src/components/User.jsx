import { useEffect, useState } from 'react'
import { useMatch } from 'react-router-dom'
import usersService from '../services/users'

const User = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await usersService.getAll()
      setUsers(response)
    }
    fetchData()
  }, [])

  const match = useMatch('/users/:id')
  const user = match ? users?.find((b) => b.id === match.params.id) : null

  console.log(user)

  return (
    <>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' }}>
        {user?.name}
      </div>
      <div style={{ fontSize: '20px', marginTop: '16px' }}>added blogs</div>
      <div>
        <ul>
          {user?.blogs.map((blog) => (
            <li>{blog.title}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default User
