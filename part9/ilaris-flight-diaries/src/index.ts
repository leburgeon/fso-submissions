import express from 'express';
import diaryRouter from './routes/diaries';
const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('Somone pinged right here');
  res.status(200).send('pong');
});

app.use('/api/diaries', diaryRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});