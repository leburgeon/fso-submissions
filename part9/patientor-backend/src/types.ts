export type Diagnosis = {
  code: string,
  name: string,
  latin?: string
};

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
  male = 'male',
  female = 'female',
  nonBinary = 'enby',
  other = 'other'
}

export type Patient = {
  id: string,
  name: string,
  dateOfBirth: string,
  gender: Gender,
  ssn: string,
  occupation: string,
};

export type PatientSinSsn = Omit<Patient, 'ssn'>;