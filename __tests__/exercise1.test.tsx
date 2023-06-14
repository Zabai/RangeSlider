import { render, waitFor } from "@testing-library/react";
import { NORMAL_RANGES_API_RESPONSE } from "../__mocks__/ranges";
import { getNormalRangeApi } from "../api/rangesApi";
import { GET_NORMAL_RANGES_ENDPOINT } from "../constants/endpoints";
import Exercise1, { getStaticProps } from "../pages/exercise1";

jest.mock("../api/rangesApi", () => ({
  getNormalRangeApi: jest.fn().mockResolvedValue(NORMAL_RANGES_API_RESPONSE[0]),
}));

describe("Pages - Exercise 1", () => {
  it("get normal ranges with ssr", async () => {
    const { props } = await getStaticProps();

    expect(getNormalRangeApi).toHaveBeenCalled();
    expect(props.fallback).toHaveProperty(
      [GET_NORMAL_RANGES_ENDPOINT],
      NORMAL_RANGES_API_RESPONSE[0]
    );
  });

  it("render page", () => {
    const { getByText } = render(<Exercise1 />);

    waitFor(() => {
      expect(getByText(/Exercise 1/i)).toBeInTheDocument();
    });
  });
});
