import { render, waitFor } from "@testing-library/react";
import { Layout } from "../Layout";

describe("Components - Layout", () => {
  it("render component", async () => {
    const title = "My page";
    const element = <p>element</p>;
    render(<Layout title={title}>{element}</Layout>);

    waitFor(() => {
      expect(document.title).toEqual(title);
      expect(element).toBeInTheDocument();
    });
  });
});
