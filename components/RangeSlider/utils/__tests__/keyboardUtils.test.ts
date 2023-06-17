import { hasPressedLeftKey, hasPressedRightKey } from "../keyboardUtils";

describe("Components - Range slider - Keyboard utils", () => {
  it("check if has pressed left key", () => {
    expect(
      hasPressedLeftKey(new KeyboardEvent("keydown", { key: "ArrowLeft" }))
    ).toBeTruthy();
    expect(
      hasPressedLeftKey(new KeyboardEvent("keydown", { key: "Left" }))
    ).toBeTruthy();
    expect(
      hasPressedLeftKey(new KeyboardEvent("keydown", { key: "ArrowRight" }))
    ).toBeFalsy();
    expect(
      hasPressedLeftKey(new KeyboardEvent("keydown", { key: "Right" }))
    ).toBeFalsy();
  });

  it("check if has pressed right key", () => {
    expect(
      hasPressedRightKey(new KeyboardEvent("keydown", { key: "ArrowLeft" }))
    ).toBeFalsy();
    expect(
      hasPressedRightKey(new KeyboardEvent("keydown", { key: "Left" }))
    ).toBeFalsy();
    expect(
      hasPressedRightKey(new KeyboardEvent("keydown", { key: "ArrowRight" }))
    ).toBeTruthy();
    expect(
      hasPressedRightKey(new KeyboardEvent("keydown", { key: "Right" }))
    ).toBeTruthy();
  });
});
