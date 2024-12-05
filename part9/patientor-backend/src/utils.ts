import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): date is string => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const parseName = (name: unknown): string => {
  if (!isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDob = (dob: unknown): string => {
  if (!dob || !isString(dob) || !isDate(dob)){
    throw new Error('Incorrect or missing date data');
  }
  return dob;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)){
    throw new Error('Incorrect gender data: ' + gender);
  };
  return gender;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)){
    throw new Error('Incorrect ssn data');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)){
    throw new Error('Incorrect occupation data');
  }

  return occupation;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object'){
    throw new Error('Data missing or incorrect');
  }

  if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'occupation' in object){
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDob(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSsn(object.ssn),
      occupation: parseOccupation(object.occupation)
    };

    return newPatient;
  }

  throw new Error('Missing some form of data for patient');
};