import { ComponentProps, useRef, useState } from "react";
import { RangeSlider } from "../RangeSlider";
import { useDocumentEvent } from "../../../hooks/useDocumentEvent";
import { hasPressedLeftKey, hasPressedRightKey } from "../utils/keyboardUtils";
import {
  calculateSliderDragValue,
  getNextFixedValue,
  getPreviousFixedValue,
} from "../utils/sliderUtils";
import { getClosestValueInArray } from "../../../utils/array";

const DEFAULT_GAP = 10;
const DEFAULT_STEP = 1;

export function useRangeSlider({
  defaultMaxValue,
  defaultMinValue,
  fixedValues = [],
  gap = DEFAULT_GAP,
  maxValue,
  minValue,
  step = DEFAULT_STEP,
}: ComponentProps<typeof RangeSlider>) {
  const [currentMax, setCurrentMax] = useState(defaultMaxValue ?? maxValue);
  const [currentMin, setCurrentMin] = useState(defaultMinValue ?? minValue);

  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const [isDraggingMin, setIsDraggingMin] = useState(false);

  const maxThumbRef = useRef<HTMLDivElement>(null);
  const minThumbRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const sanitizeMaxInput = (input: number) => {
    if (fixedValues.length) {
      const closeValue = getClosestValueInArray(fixedValues, input);

      return closeValue > currentMin ? closeValue : currentMax;
    } else {
      return Math.max(currentMin + gap, Math.min(input, maxValue));
    }
  };

  const sanitizeMinInput = (input: number) => {
    if (fixedValues.length) {
      const closeValue = getClosestValueInArray(fixedValues, input);

      return closeValue < currentMax ? closeValue : currentMin;
    }
    return fixedValues.length
      ? Math.min(getClosestValueInArray(fixedValues, input))
      : Math.min(Math.max(input, minValue), currentMax - gap);
  };

  const handleKeyboardControls = (event: KeyboardEvent) => {
    const { activeElement } = document;
    const isMaxThumbSelected = activeElement === maxThumbRef.current;
    const isMinThumbSelected = activeElement === minThumbRef.current;

    if (isMaxThumbSelected || isMinThumbSelected) {
      const hasFixedValues = fixedValues.length;
      const currentValue = isMaxThumbSelected ? currentMax : currentMin;
      const setCurrentValue = isMaxThumbSelected
        ? setCurrentMax
        : setCurrentMin;
      const sanitizeInput = isMaxThumbSelected
        ? sanitizeMaxInput
        : sanitizeMinInput;

      if (hasPressedLeftKey(event)) {
        setCurrentValue(
          sanitizeInput(
            hasFixedValues
              ? getPreviousFixedValue(currentValue, fixedValues)
              : currentValue - step
          )
        );
      } else if (hasPressedRightKey(event)) {
        setCurrentValue(
          sanitizeInput(
            hasFixedValues
              ? getNextFixedValue(currentValue, fixedValues)
              : currentValue + step
          )
        );
      }
    }
  };
  useDocumentEvent("keydown", handleKeyboardControls);

  const handleDrag = (event: MouseEvent) => {
    const isDragging = isDraggingMin || isDraggingMax;

    if (isDragging && sliderRef.current) {
      const value = calculateSliderDragValue(
        event,
        sliderRef.current.getBoundingClientRect(),
        [minValue, maxValue],
        step
      );

      if (isDraggingMax) {
        setCurrentMax(sanitizeMaxInput(value));
      } else {
        setCurrentMin(sanitizeMinInput(value));
      }
    }
  };
  useDocumentEvent("mousemove", handleDrag);

  const stopDragging = () => {
    setIsDraggingMax(false);
    setIsDraggingMin(false);
  };
  useDocumentEvent("mouseup", stopDragging);

  return {
    isDraggingMax,
    isDraggingMin,
    currentMax,
    maxThumbRef,
    currentMin,
    minThumbRef,
    setCurrentMax: (value: number) => setCurrentMax(sanitizeMaxInput(value)),
    setCurrentMin: (value: number) => setCurrentMin(sanitizeMinInput(value)),
    setIsDraggingMax,
    setIsDraggingMin,
    sliderRef,
  };
}
