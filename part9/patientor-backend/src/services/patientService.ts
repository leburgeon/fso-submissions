import patientData from '../../data/patients';
import { Patient, PatientSinSsn } from '../types';

const getAll = (): Patient[] => {
  return patientData;
};

const getAllSinSsn = (): PatientSinSsn[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation};
  });
};

export default { getAll, getAllSinSsn };