import { getClosestValueInArray } from "../array";

describe("Utils - Array", () => {
  it("get closest value of array", () => {
    const array = [1, 5, 10];

    expect(getClosestValueInArray(array, 3)).toBe(1);
    expect(getClosestValueInArray(array, 7)).toBe(5);
    expect(getClosestValueInArray(array, 9)).toBe(10);
  });
});
