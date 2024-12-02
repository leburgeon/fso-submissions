import express from 'express'
const app = express()

app.get('/ping', (_req, res) => {
  res.send('pong')
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

