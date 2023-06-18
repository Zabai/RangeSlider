import { EditableLabel } from "../EditableLabel/EditableLabel";
import styles from "./RangeSlider.module.css";
import { useRangeSlider } from "./hooks/useRangeSlider";
import { RangeValues } from "./types/rangeTypes";
import {
  getMaxThumbStyles,
  getMinThumbStyles,
  getProgressBarStyles,
} from "./utils/styleUtils";

interface Props {
  currency?: string;
  defaultMaxValue?: number;
  defaultMinValue?: number;
  fixedValues?: number[];
  gap?: number;
  maxValue: number;
  minValue: number;
  step?: number;
}

export function RangeSlider(props: Props) {
  const { currency = "", fixedValues, maxValue, minValue } = props;
  const {
    isDraggingMax,
    isDraggingMin,
    currentMax,
    currentMin,
    maxThumbRef,
    minThumbRef,
    setCurrentMax,
    setCurrentMin,
    setIsDraggingMax,
    setIsDraggingMin,
    sliderRef,
  } = useRangeSlider(props);

  const canEditByInput = !fixedValues || !fixedValues?.length;
  const currentValues: RangeValues = [currentMin, currentMax];
  const range: RangeValues = [minValue, maxValue];

  return (
    <div className={styles.container}>
      <div className={styles.inputLeft}>
        <EditableLabel
          canEdit={canEditByInput}
          label={`${currentMin} ${currency}`}
          onEdit={(value) => !isNaN(+value) && setCurrentMin(+value)}
          value={`${currentMin}`}
        />
      </div>
      <div className={styles.rangeSlider} ref={sliderRef}>
        <div
          className={styles.rangeBar}
          style={getProgressBarStyles(currentValues, range)}
        ></div>
        <div
          aria-label="Minimum price"
          aria-valuemax={maxValue}
          aria-valuemin={minValue}
          aria-valuenow={currentMin}
          className={styles.thumb}
          style={getMinThumbStyles(currentValues, range, isDraggingMin)}
          onMouseDown={() => setIsDraggingMin(true)}
          ref={minThumbRef}
          role="slider"
          tabIndex={0}
        ></div>
        <div
          aria-label="Maximum price"
          aria-valuemax={maxValue}
          aria-valuemin={minValue}
          aria-valuenow={currentMax}
          className={styles.thumb}
          style={getMaxThumbStyles(currentValues, range, isDraggingMax)}
          onMouseDown={() => setIsDraggingMax(true)}
          ref={maxThumbRef}
          role="slider"
          tabIndex={0}
        ></div>
      </div>
      <div className={styles.inputRight}>
        <EditableLabel
          canEdit={canEditByInput}
          label={`${currentMax} ${currency}`}
          onEdit={(value) => !isNaN(+value) && setCurrentMax(+value)}
          value={`${currentMax}`}
        />
      </div>
    </div>
  );
}
