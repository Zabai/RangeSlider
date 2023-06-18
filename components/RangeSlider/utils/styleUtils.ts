import { CSSProperties } from "react";
import { RangeValues } from "../types/rangeTypes";

function calculateRangeDifference([minValue, maxValue]: RangeValues) {
  return maxValue - minValue;
}

function getDraggingCursor(isDragging: boolean): CSSProperties["cursor"] {
  return isDragging ? "grabbing" : "grab";
}

export function getMaxThumbStyles(
  [_min, currentMax]: RangeValues,
  range: RangeValues,
  isDragging: boolean
): CSSProperties {
  return {
    cursor: getDraggingCursor(isDragging),
    left: `${
      ((currentMax - range[0]) / calculateRangeDifference(range)) * 100
    }%`,
  };
}

export function getMinThumbStyles(
  [min]: RangeValues,
  range: RangeValues,
  isDragging: boolean
): CSSProperties {
  return {
    cursor: getDraggingCursor(isDragging),
    left: `${((min - range[0]) / calculateRangeDifference(range)) * 100}%`,
  };
}

export function getProgressBarStyles(
  [currentMin, currentMax]: RangeValues,
  range: RangeValues
): CSSProperties {
  const rangeDiff = calculateRangeDifference(range);

  return {
    left: `${((currentMin - range[0]) / rangeDiff) * 100}%`,
    width: `${((currentMax - currentMin) / rangeDiff) * 100}%`,
  };
}
