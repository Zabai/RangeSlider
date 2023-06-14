import { render, waitFor } from "@testing-library/react";
import { FIXED_RANGES_API_RESPONSE } from "../__mocks__/ranges";
import { getFixedRangeApi } from "../api/rangesApi";
import { GET_FIXED_RANGES_ENDPOINT } from "../constants/endpoints";
import Exercise2, { getStaticProps } from "../pages/exercise2";

jest.mock("../api/rangesApi", () => ({
  getFixedRangeApi: jest.fn().mockResolvedValue(FIXED_RANGES_API_RESPONSE[0]),
}));

describe("Pages - Exercise 2", () => {
  it("get fixed ranges with ssr", async () => {
    const { props } = await getStaticProps();

    expect(getFixedRangeApi).toHaveBeenCalled();
    expect(props.fallback).toHaveProperty(
      [GET_FIXED_RANGES_ENDPOINT],
      FIXED_RANGES_API_RESPONSE[0]
    );
  });

  it("render page", () => {
    const { getByText } = render(<Exercise2 />);

    waitFor(() => {
      expect(getByText(/Exercise 2/i)).toBeInTheDocument();
    });
  });
});
