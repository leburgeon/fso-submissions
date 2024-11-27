import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login({ username, password }))
    navigate('/')
  }

  return (<div data-testid="loginForm">
    <form onSubmit={handleLogin}>
      username
      <input
        type="text"
        data-testid="username"
        name="username"
        autoComplete="username"
        required
      />
      <br />
      password
      <input
        type="password"
        data-testid="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>)
}

export default LoginForm
