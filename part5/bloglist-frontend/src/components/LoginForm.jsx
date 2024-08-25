import PropTypes from 'prop-types'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => (
  <>
    <form onSubmit={handleLogin}>
      username
      <input type="text" value={username}
        onChange={({ target }) => setUsername(target.value)}
        name="Username" autoComplete="username"
      />
      <br/>
      password
      <input type="password" value={password}
        onChange={({ target }) => setPassword(target.value)}
        name="Password" autoComplete="current-password"
      />
      <br/>
      <button type="submit">Login</button>
    </form>
  </>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm