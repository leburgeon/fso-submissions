"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewDiaryEntrySchema = void 0;
const zod_1 = require("zod");
const WeatherEnum = zod_1.z.enum(['sunny', 'rainy', 'cloudy', 'stormy', 'windy']);
const VisibilityEnum = zod_1.z.enum(['great', 'good', 'ok', 'poor']);
exports.NewDiaryEntrySchema = zod_1.z.object({
    date: zod_1.z.string(),
    weather: WeatherEnum,
    visibility: VisibilityEnum,
    comment: zod_1.z.string()
});
