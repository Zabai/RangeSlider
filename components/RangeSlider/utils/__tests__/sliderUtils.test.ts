import { RangeValues } from "../../types/rangeTypes";
import {
  calculateSliderDragValue,
  getNextFixedValue,
  getPreviousFixedValue,
} from "../sliderUtils";

describe("Components - Range slider - Slider utils", () => {
  const fixedValues = [0, 25, 50, 75, 100];

  it("calculate slider drag value", () => {
    const range: RangeValues = [0, 500];
    const sliderSize = { left: 0, width: 100 } as DOMRect;
    const mouseX = 75;

    const value = calculateSliderDragValue(
      new MouseEvent("mousemove", { clientX: mouseX }),
      sliderSize,
      range,
      1
    );

    expect(value).toBe(range[1] * (mouseX / sliderSize.width));
  });

  it("get next fixed value", () => {
    expect(getNextFixedValue(fixedValues[0], fixedValues)).toBe(fixedValues[1]);
    expect(getNextFixedValue(fixedValues[4], fixedValues)).toBe(fixedValues[4]);
  });

  it("get previous fixed value", () => {
    expect(getPreviousFixedValue(fixedValues[4], fixedValues)).toBe(
      fixedValues[3]
    );
    expect(getPreviousFixedValue(fixedValues[0], fixedValues)).toBe(
      fixedValues[0]
    );
  });
});
