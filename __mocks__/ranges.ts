import { FixedRange, NormalRange } from "../types/ranges";

export const FIXED_RANGES_API_RESPONSE: FixedRange[] = [
  [1, 2, 3, 5, 6, 7, 8, 9, 10],
  [5.99, 9.99, 19.99, 49.99],
];

export const NORMAL_RANGES_API_RESPONSE: NormalRange[] = [
  { max: 10, min: 1 },
  { max: 100, min: 0 },
];
