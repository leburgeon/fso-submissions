"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
exports.newPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    ssn: zod_1.z.string(),
    occupation: zod_1.z.string()
});
