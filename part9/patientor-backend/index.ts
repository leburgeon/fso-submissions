import express from 'express';

const app = express();

app.get('/api/ping', (_req, res) => {
  console.log('somone pinged right about here');
  res.status(200).send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});