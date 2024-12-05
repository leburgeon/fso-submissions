import express, { Response } from 'express';
import { PatientSinSsn } from '../types';
import patientService from '../services/patientService';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<PatientSinSsn[]>) => {
  res.send(patientService.getAllSinSsn());
});

export default patientRouter;