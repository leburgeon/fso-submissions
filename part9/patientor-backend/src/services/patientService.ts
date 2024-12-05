import patientData from '../../data/patients';
import { NewPatient, Patient, PatientSinSsn } from '../types';
import { v1 as uuid } from 'uuid';


const getAll = (): Patient[] => {
  return patientData;
};

const getAllSinSsn = (): PatientSinSsn[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation};
  });
};

const addPatient = (newPatient: NewPatient): Patient => {
  const addedPatient = {
    id: uuid(),
    ...newPatient
  };
  patientData.push(addedPatient);
  return addedPatient;
};

export default { getAll, getAllSinSsn, addPatient };