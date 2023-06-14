import {
  GET_FIXED_RANGES_ENDPOINT,
  GET_NORMAL_RANGES_ENDPOINT,
} from "../constants/endpoints";
import { fixedRangesApiSchema, normalRangesApiSchema } from "../schemas/ranges";
import { FixedRange, NormalRange } from "../types/ranges";
import { fetchJson } from "../utils/fetch";
import { getRandomItemFromArray } from "../utils/random";

export function getFixedRangeApi(): Promise<FixedRange> {
  return fetchJson<FixedRange[]>(GET_FIXED_RANGES_ENDPOINT)
    .then((ranges) => fixedRangesApiSchema.validate(ranges))
    .then((ranges) => getRandomItemFromArray(ranges));
}

export function getNormalRangeApi(): Promise<NormalRange> {
  return fetchJson<NormalRange[]>(GET_NORMAL_RANGES_ENDPOINT)
    .then((ranges) => normalRangesApiSchema.validate(ranges))
    .then((ranges) => getRandomItemFromArray(ranges));
}
