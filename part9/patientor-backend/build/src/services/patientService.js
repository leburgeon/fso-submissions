"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getAll = () => {
    return patients_1.default;
};
const getAllSinSsn = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => {
        return { id, name, dateOfBirth, gender, occupation };
    });
};
const addPatient = (newPatient) => {
    const addedPatient = Object.assign({ id: (0, uuid_1.v1)() }, newPatient);
    patients_1.default.push(addedPatient);
    return addedPatient;
};
exports.default = { getAll, getAllSinSsn, addPatient };
