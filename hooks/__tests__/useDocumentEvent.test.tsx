import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { useDocumentEvent } from "../useDocumentEvent";

type HookArguments = Parameters<typeof useDocumentEvent>;
interface Props {
  arguments: HookArguments;
}

describe("Hooks - Use mouse events", () => {
  const Component = (props: Props) => {
    useDocumentEvent(...props.arguments);

    return <div />;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("register document event", () => {
    const onClick = jest.fn();
    const addEventSpy = jest.spyOn(document, "addEventListener");
    render(<Component arguments={["click", onClick]} />);

    expect(addEventSpy).toHaveBeenCalledWith("click", onClick);
  });

  it("call document event", () => {
    const onClick = jest.fn();
    const { container } = render(<Component arguments={["click", onClick]} />);
    fireEvent.click(container);

    expect(onClick).toHaveBeenCalled();
  });

  it("unregister document event", () => {
    const onClick = jest.fn();
    const removeEventSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = render(<Component arguments={["click", onClick]} />);
    unmount();

    expect(removeEventSpy).toHaveBeenCalledWith("click", onClick);
  });
});
