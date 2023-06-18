import { RangeValues } from "../types/rangeTypes";

export function calculateSliderDragValue(
  event: MouseEvent,
  sliderRect: DOMRect,
  [minValue, maxValue]: RangeValues,
  step: number
) {
  const { left, width } = sliderRect;
  const offsetX = event.clientX - left;
  const percentage = (offsetX / width) * 100;

  const newValue = ((maxValue - minValue) / 100) * percentage + minValue;
  const roundedValue = Math.round(newValue / step) * step;

  return roundedValue;
}

export function getNextFixedValue(currentValue: number, fixedValues: number[]) {
  const currentValueIndex = fixedValues.indexOf(currentValue);

  return fixedValues[currentValueIndex + 1] ?? currentValue;
}

export function getPreviousFixedValue(
  currentValue: number,
  fixedValues: number[]
) {
  const currentValueIndex = fixedValues.indexOf(currentValue);

  return fixedValues[currentValueIndex - 1] ?? currentValue;
}
