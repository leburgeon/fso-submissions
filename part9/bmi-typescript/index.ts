import express from 'express'
const app = express()
import bmiRouter from './controllers/bmiController'

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('hello full stack')
})

app.use('/bmi', bmiRouter)

const PORT = 3000

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})


