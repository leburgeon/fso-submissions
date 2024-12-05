import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('somone pinged right about here');
  res.status(200).send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);

app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});