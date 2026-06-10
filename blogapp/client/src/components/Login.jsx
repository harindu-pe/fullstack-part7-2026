import { Button, FormControl, Input, InputLabel } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserActions } from '../stores/userStore'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigate()

  const { doLogin } = useUserActions()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await doLogin({ username, password })
      setUsername('')
      setPassword('')
      navigation('/')
    } catch (e) {
      console.log(e)
      console.log('wrong credentials')
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 8 }}>
          <FormControl>
            <InputLabel>username</InputLabel>
            <Input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </FormControl>
        </div>
        <div style={{ marginBottom: 8 }}>
          <FormControl>
            <InputLabel>password</InputLabel>
            <Input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </FormControl>
        </div>
        <div style={{ marginTop: 8 }}>
          <Button type="submit" variant="contained">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
