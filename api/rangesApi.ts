import {
  GET_FIXED_RANGES_ENDPOINT,
  GET_NORMAL_RANGES_ENDPOINT,
} from "../constants/endpoints";
import { FixedRange, NormalRange } from "../types/ranges";
import { fetchJson } from "../utils/fetch";
import { getRandomItemFromArray } from "../utils/random";

export function getFixedRangeApi() {
  return fetchJson<FixedRange[]>(GET_FIXED_RANGES_ENDPOINT).then((ranges) =>
    getRandomItemFromArray(ranges)
  );
}

export function getNormalRangeApi() {
  return fetchJson<NormalRange[]>(GET_NORMAL_RANGES_ENDPOINT).then((ranges) =>
    getRandomItemFromArray(ranges)
  );
}
