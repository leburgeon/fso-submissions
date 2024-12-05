import { NewDiaryEntry, Visibility } from "./types";
import { Weather } from "./types";

// Example of a type predicate - returns a boolean with a type of 'type predicate'
// If this type guard returns true, tsc knows that the tested variable is of the type of the type prediate
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string => {
  if (!isString(comment)){
    throw new Error('Incorrect or missing comment!');
  }
  return comment;
};

// This type guard checks that the date string can be parsed by the Date api
// Cannot use a type prediate type guard as date is only a string anyway
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)){
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

// This type gurad, checks that the parameter passed, is one of the enum values of Weather
// The function first retrieves an array of the enum values of Weather using Object.values
// This array is then mapped to an array of the string representations of the values
// The predicate returns true if the parameter is in this array of string representation of weather enum values
const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)){
    throw new Error('Incorrect or missing weather' + weather);
  }

  return weather;
};

// Again, this type guard checks that visibility is in the array of string values for the enum Visiblity
const isVisibility = (visibility: string): visibility is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(visibility);
};

// These parser functions take a variable with a likely buy unknown type
// They use type guards to narrow the type of the variable, returning it once the required type has been ensured
const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)){
    throw new Error('visibility is missing or incorrect: ' + visibility);
  }

  return visibility;
};

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  // Operations cannot be performed on uknown so a type guard is used to narrow
  if (!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment)
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};