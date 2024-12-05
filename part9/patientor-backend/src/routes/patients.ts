import express, { Response } from 'express';
import { PatientSinSsn } from '../types';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<PatientSinSsn[]>) => {
  res.send(patientService.getAllSinSsn());
});

patientRouter.post('/', (req, res) => {
  try{
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Somthing went wrong: ';
    if (error instanceof Error){
      errorMessage += error.message;
    }
    res.status(400).send({error: errorMessage});
  }
});

export default patientRouter;