import { render } from "@testing-library/react";
import { Navigation } from "../Navigation";

describe("Features - Navigation", () => {
  it("render component", () => {
    const { getByRole } = render(<Navigation />);

    expect(getByRole("navigation")).toBeInTheDocument();
  });
});
