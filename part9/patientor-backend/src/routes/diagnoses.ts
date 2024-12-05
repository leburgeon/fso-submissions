import express, { Response } from 'express';
const diagnosesRouter = express.Router();
import diagnosisService from '../services/diagnosisService';
import { Diagnosis } from '../types';

diagnosesRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosisService.getAll());
});

export default diagnosesRouter;