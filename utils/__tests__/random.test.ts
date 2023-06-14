import { getRandomItemFromArray } from "../random";

describe("Utils - Random", () => {
  const array = [1, 2, 3, 4, 5];

  it("get random item from empty array", () => {
    const item = getRandomItemFromArray([]);

    expect(item).toBeUndefined();
  });

  it("get random item from array", () => {
    const floorSpy = jest.spyOn(Math, "floor");
    const randomSpy = jest.spyOn(Math, "random");
    const item = getRandomItemFromArray(array);

    expect(floorSpy).toHaveBeenCalled();
    expect(randomSpy).toHaveBeenCalled();
    expect(array).toContain(item);
  });
});
