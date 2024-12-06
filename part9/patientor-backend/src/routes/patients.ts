import express, { Response, Request, NextFunction } from 'express';
import { NewPatient, PatientSinSsn, Patient } from '../types';
import patientService from '../services/patientService';
import { newPatientSchema } from '../utils';
import { ZodError } from 'zod';

const patientRouter = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    // If the request body parses through the request validator without throwing error,
    newPatientSchema.parse(req.body)
    //moves onto the next request handler
    next();
  } catch (error: unknown){
    // If an error is thrown, the error is passed to the error handler
    next(error);
  }
};

const errorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
  // If the error is an instance of zod error, the request validator has thrown an error, and the issues are returned in the response
  if (error instanceof ZodError) {
    res.status(400).send({error: error.issues});
    // Else if the error is of a different type, the error is passed along to future error hanlders for type checking
  } else {
    next(error);
  }
}

patientRouter.get('/', (_req, res: Response<PatientSinSsn[]>) => {
  res.send(patientService.getAllSinSsn());
});

patientRouter.post('/', newPatientParser, (req: Request<NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body) as Pat;
  res.status(200).send(addedPatient);
});

patientRouter.use(errorHandler);

export default patientRouter;