import {Alert, Container, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow, TextField, CardHeader, ListSubheader, Toolbar, AppBar, IconButton } from '@mui/material'
import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';

import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch
} from "react-router-dom"


const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
)

const Note = ({ note }) => {

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map(note => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>
                {note.user}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
  </div>
)

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  const padding = {
    margin: '5px'
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField style={padding} label='username'/>
        </div>
        <div>
          <TextField style={padding} label='password' type='password'/>
        </div>
  
        <Button style={padding} variant='contained' color='secondary' type='submit'>
          Login
        </Button>
      </form>
    </div>
  )
}

const Menu = ({user}) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="inherit">
              <AddIcon/>
        </IconButton> 
        <Button component={Link} to='/' color='inherit'>
          HOME
        </Button>
        <Button component={Link} to='/notes' color='inherit'>
          NOTES
        </Button>
        <Button component={Link} to='/users' color='inherit'>
          USERS
        </Button>
        {!user && <Button component={Link} to='/login' color='inherit'>
          LOGIN
        </Button>}
      </Toolbar>
    </AppBar>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)

  const [message, setMessage] = useState('')

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage('')
    }, 5000)

  }

  const match = useMatch('/notes/:id')

  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null


  const login = (user) => {
    setUser(user)
    notify(`${user} logged in`)
  }

  const padding = {
    padding: 5
  }

  return (
    <Container sx={{flexGrow: 1}}>
      <div>
        {(message &&
          <Alert severity="success">
            {message}
          </Alert>
        )}
      </div>
      <Menu user={user}/>
      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <div>
        <br />
        <em>Note app, Department of Computer Science 2022</em>
      </div>
    </Container>
  )
}

export default App