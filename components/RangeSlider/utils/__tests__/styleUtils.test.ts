import { RangeValues } from "../../types/rangeTypes";
import {
  getMaxThumbStyles,
  getMinThumbStyles,
  getProgressBarStyles,
} from "../styleUtils";

describe("Components - Range slide - Style utils", () => {
  const currentValues: RangeValues = [25, 75];
  const range: RangeValues = [0, 100];

  it("build max thumb styles without dragging", () => {
    const styles = getMaxThumbStyles(currentValues, range, false);

    expect(styles).toHaveProperty("cursor", "grab");
    expect(styles).toHaveProperty("left");
  });

  it("build max thumb styles with dragging", () => {
    const styles = getMaxThumbStyles(currentValues, range, true);

    expect(styles).toHaveProperty("cursor", "grabbing");
    expect(styles).toHaveProperty("left");
  });

  it("build min thumb styles without dragging", () => {
    const styles = getMinThumbStyles(currentValues, range, false);

    expect(styles).toHaveProperty("cursor", "grab");
    expect(styles).toHaveProperty("left");
  });

  it("build min thumb styles with dragging", () => {
    const styles = getMinThumbStyles(currentValues, range, true);

    expect(styles).toHaveProperty("cursor", "grabbing");
    expect(styles).toHaveProperty("left");
  });

  it("build progress bar styles", () => {
    const styles = getProgressBarStyles(currentValues, range);

    expect(styles).toHaveProperty("left");
    expect(styles).toHaveProperty("width");
  });
});
