import { fireEvent, render } from "@testing-library/react";
import { RangeSlider } from "../RangeSlider";

const MIN_THUMB_TID = "min-thumb";
const MAX_THUMB_TID = "max-thumb";

describe("Components - Range slider", () => {
  const fixedValues = [0, 250, 500, 750, 1000];
  const maxValue = 1000;
  const minValue = 0;
  const step = 1;

  it("render component", () => {
    const { getByRole, getByTestId } = render(
      <RangeSlider maxValue={maxValue} minValue={minValue} />
    );

    expect(getByRole("button", { name: `${minValue}` })).toBeInTheDocument();
    expect(getByRole("button", { name: `${maxValue}` })).toBeInTheDocument();
    expect(getByTestId(MIN_THUMB_TID)).toBeInTheDocument();
    expect(getByTestId(MAX_THUMB_TID)).toBeInTheDocument();
  });

  it("change minimum by input", () => {
    const { getByRole, getByTestId } = render(
      <RangeSlider maxValue={maxValue} minValue={minValue} />
    );
    fireEvent.click(getByRole("button", { name: `${minValue}` }));

    const input = getByRole("textbox");
    const currentMin = maxValue / 2;
    fireEvent.change(input, { target: { value: `${currentMin}` } });
    fireEvent.submit(input);

    expect(getByRole("button", { name: `${currentMin}` })).toBeInTheDocument();
    expect(getByTestId(MIN_THUMB_TID)).toHaveAttribute(
      "aria-valuenow",
      `${currentMin}`
    );
  });

  it("change maximum by input", () => {
    const { getByRole, getByTestId } = render(
      <RangeSlider maxValue={maxValue} minValue={minValue} />
    );
    fireEvent.click(getByRole("button", { name: `${maxValue}` }));

    const input = getByRole("textbox");
    const currentMax = maxValue / 2;
    fireEvent.change(input, { target: { value: `${currentMax}` } });
    fireEvent.submit(input);

    expect(getByRole("button", { name: `${currentMax}` })).toBeInTheDocument();
    expect(getByTestId(MAX_THUMB_TID)).toHaveAttribute(
      "aria-valuenow",
      `${currentMax}`
    );
  });

  it("can not change by input when has fixed values", () => {
    const { getByRole } = render(
      <RangeSlider
        fixedValues={fixedValues}
        maxValue={maxValue}
        minValue={minValue}
      />
    );

    expect(() => getByRole("button", { name: `${minValue}` })).toThrowError();
    expect(() => getByRole("button", { name: `${maxValue}` })).toThrowError();
  });

  it("change minimum by dragging", () => {
    const { getByRole, getByTestId } = render(
      <RangeSlider maxValue={maxValue} minValue={minValue} />
    );

    const minThumb = getByTestId(MIN_THUMB_TID);
    fireEvent.mouseDown(minThumb);
    fireEvent.mouseMove(minThumb, { clientX: 1 });
    fireEvent.mouseUp(minThumb);

    expect(() => getByRole("button", { name: `${minValue}` })).toThrowError();
    expect(getByTestId(MIN_THUMB_TID)).not.toHaveAttribute(
      "aria-valuenow",
      `${minValue}`
    );
  });

  it("change maximum by dragging", () => {
    const { getByRole, getByTestId } = render(
      <RangeSlider maxValue={maxValue} minValue={minValue} />
    );

    const maxThumb = getByTestId(MAX_THUMB_TID);
    fireEvent.mouseDown(maxThumb);
    fireEvent.mouseMove(maxThumb, { clientX: -1 });
    fireEvent.mouseUp(maxThumb);

    expect(() => getByRole("button", { name: `${maxValue}` })).toThrowError();
    expect(getByTestId(MAX_THUMB_TID)).not.toHaveAttribute(
      "aria-valuenow",
      `${maxValue}`
    );
  });

  it("change minimum by keyboard input", () => {
    const { getByRole, getByTestId } = render(
      <RangeSlider maxValue={maxValue} minValue={minValue} step={1} />
    );

    const minThumb = getByTestId(MIN_THUMB_TID);
    minThumb.focus();
    fireEvent.keyDown(minThumb, { key: "ArrowRight" });
    fireEvent.keyDown(minThumb, { key: "Right" });

    const currentMin = minValue + step * 2;

    expect(getByRole("button", { name: `${currentMin}` })).toBeInTheDocument();
    expect(getByTestId(MIN_THUMB_TID)).toHaveAttribute(
      "aria-valuenow",
      `${currentMin}`
    );

    fireEvent.keyDown(minThumb, { key: "ArrowLeft" });
    fireEvent.keyDown(minThumb, { key: "Left" });

    expect(getByRole("button", { name: `${minValue}` })).toBeInTheDocument();
    expect(getByTestId(MIN_THUMB_TID)).toHaveAttribute(
      "aria-valuenow",
      `${minValue}`
    );
  });

  it("change maximum by keyboard input", () => {
    const { getByRole, getByTestId } = render(
      <RangeSlider maxValue={maxValue} minValue={minValue} step={1} />
    );

    const maxThumb = getByTestId(MAX_THUMB_TID);
    maxThumb.focus();
    fireEvent.keyDown(maxThumb, { key: "ArrowLeft" });
    fireEvent.keyDown(maxThumb, { key: "Left" });

    const currentMax = maxValue - step * 2;

    expect(getByRole("button", { name: `${currentMax}` })).toBeInTheDocument();
    expect(getByTestId(MAX_THUMB_TID)).toHaveAttribute(
      "aria-valuenow",
      `${currentMax}`
    );

    fireEvent.keyDown(maxThumb, { key: "ArrowRight" });
    fireEvent.keyDown(maxThumb, { key: "Right" });

    expect(getByRole("button", { name: `${maxValue}` })).toBeInTheDocument();
    expect(getByTestId(MAX_THUMB_TID)).toHaveAttribute(
      "aria-valuenow",
      `${maxValue}`
    );
  });
});
