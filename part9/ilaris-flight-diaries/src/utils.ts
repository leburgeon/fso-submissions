import {  Visibility, Weather } from "./types";
import { z } from 'zod';

// Zod object schema can be used to validate against defined object schemas
export const newEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
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