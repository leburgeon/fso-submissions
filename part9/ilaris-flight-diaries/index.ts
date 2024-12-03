import express from 'express';

const app = express();

app.get('/ping', (_req, res) => {
  console.log('Somone pinged right here');
  res.status(200).send('pong');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});