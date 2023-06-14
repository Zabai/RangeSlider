import {
  FIXED_RANGES_API_RESPONSE,
  NORMAL_RANGES_API_RESPONSE,
} from "../../__mocks__/ranges";
import { fetchJson } from "../../utils/fetch";
import * as random from "../../utils/random";
import { getFixedRangeApi, getNormalRangeApi } from "../rangesApi";

jest.mock("../../utils/fetch", () => ({
  fetchJson: jest.fn(),
}));

jest.mock("../../utils/random", () => ({
  __esModule: true,
  ...jest.requireActual("../../utils/random"),
}));

describe("API - Ranges", () => {
  const fetchJsonMock = fetchJson as jest.MockedFunction<typeof fetchJson>;
  const randomItemSpy = jest.spyOn(random, "getRandomItemFromArray");
  const error = "error";

  it("get fixed range from api", async () => {
    fetchJsonMock.mockResolvedValueOnce(FIXED_RANGES_API_RESPONSE);
    const range = await getFixedRangeApi();

    expect(randomItemSpy).toHaveBeenCalledWith(FIXED_RANGES_API_RESPONSE);
    expect(FIXED_RANGES_API_RESPONSE).toContain(range);
  });

  it("rejects on getting fixed range with api error", async () => {
    fetchJsonMock.mockRejectedValueOnce(error);

    try {
      await getFixedRangeApi();
    } catch (e) {
      expect(e).toBe(error);
    }
  });

  it("get normal range from api", async () => {
    fetchJsonMock.mockResolvedValue(NORMAL_RANGES_API_RESPONSE);
    const range = await getNormalRangeApi();

    expect(randomItemSpy).toHaveBeenCalled();
    expect(NORMAL_RANGES_API_RESPONSE).toContain(range);
  });

  it("rejects on getting normal range with api error", async () => {
    fetchJsonMock.mockRejectedValueOnce(error);

    try {
      await getNormalRangeApi();
    } catch (e) {
      expect(e).toBe(error);
    }
  });
});
