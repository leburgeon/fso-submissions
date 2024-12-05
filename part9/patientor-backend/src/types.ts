export type Diagnosis = {
  code: string,
  name: string,
  latin?: string
};

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: string,
  ssn: string,
  occupation: string,
};

export type PatientSinSsn = Omit<Patient, 'ssn'>;