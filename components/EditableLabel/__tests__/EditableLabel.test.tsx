import { fireEvent, render } from "@testing-library/react";
import { EditableLabel } from "../EditableLabel";

describe("Components - Editable label", () => {
  const onEdit = jest.fn();
  const value = "hello";

  it("render component", () => {
    const { getByRole } = render(
      <EditableLabel onEdit={onEdit} value={value} />
    );

    expect(getByRole("button", { name: value })).toBeInTheDocument();
    expect(() => getByRole("textbox")).toThrowError();
  });

  it("change to input when click on label", () => {
    const { getByRole } = render(
      <EditableLabel onEdit={onEdit} value={value} />
    );
    fireEvent.click(getByRole("button", { name: value }));

    expect(() => getByRole("button", { name: value })).toThrowError();
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("call onEdit prop when finish editing", () => {
    const { getByRole } = render(
      <EditableLabel onEdit={onEdit} value={value} />
    );

    fireEvent.click(getByRole("button", { name: value }));

    const newValue = "hello world";
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: newValue } });
    fireEvent.submit(input);

    expect(onEdit).toHaveBeenCalledWith(newValue);
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("do not change to input when its not editable", () => {
    const { getByRole } = render(
      <EditableLabel canEdit={false} onEdit={onEdit} value={value} />
    );
    fireEvent.click(getByRole("button", { name: value }));

    expect(getByRole("button", { name: value })).toBeInTheDocument();
    expect(() => getByRole("textbox")).toThrowError();
  });
});
