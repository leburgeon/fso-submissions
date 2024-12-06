import patientData from '../../data/patients';
import { Patient, PatientSinSsn, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';


const getAll = (): Patient[] => {
  return patientData;
};

const getAllSinSsn = (): PatientSinSsn[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation};
  });
};

const addPatient = (object: NewPatient): Patient => {
  const patient = {
    id: uuid(),
    ...object
  }
  patientData.push(patient);
  return patient;
};

export default { getAll, getAllSinSsn, addPatient };