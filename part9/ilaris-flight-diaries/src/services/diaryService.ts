import diaryData from '../../data/entries';

import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';

// Type assertion needed here as we know the type of the data that is in the json file
// Typescript compiler interperets the contents of the json file, and makes assumptions about the type of data
// Since we are asserting a more specic type of the data, and we are certain of the type of the data

const getEntries = (): DiaryEntry[] => {
  return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryData.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries
};