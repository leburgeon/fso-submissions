"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newEntrySchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
// Zod object schema can be used to validate against defined object schemas
exports.newEntrySchema = zod_1.z.object({
    weather: zod_1.z.nativeEnum(types_1.Weather),
    visibility: zod_1.z.nativeEnum(types_1.Visibility),
    date: zod_1.z.string().date(),
    comment: zod_1.z.string().optional()
});
// export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
//   // Operations cannot be performed on uknown so a type guard is used to narrow
//   if (!object || typeof object !== 'object'){
//     throw new Error('Incorrect or missing data');
//   }
//   if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
//     const newEntry: NewDiaryEntry = {
//       weather: parseWeather(object.weather),
//       visibility: parseVisibility(object.visibility),
//       date: parseDate(object.date),
//       comment: z.string().parse(object.comment)
//     };
//     return newEntry;
//   }
//   throw new Error('Incorrect data: some fields are missing');
// };
