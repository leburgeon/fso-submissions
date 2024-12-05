"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).map(v => v.toString()).includes(gender);
};
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDob = (dob) => {
    if (!dob || !isString(dob) || !isDate(dob)) {
        throw new Error('Incorrect or missing date data');
    }
    return dob;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender data: ' + gender);
    }
    ;
    return gender;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Incorrect ssn data');
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrect occupation data');
    }
    return occupation;
};
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Data missing or incorrect');
    }
    console.log(object);
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'ssn' in object && 'occupation' in object) {
        const newPatient = {
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
exports.toNewPatient = toNewPatient;
