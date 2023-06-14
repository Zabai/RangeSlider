import fetchMock from "jest-fetch-mock";
import { fetchJson } from "../fetch";

describe("Utils - Fetcher", () => {
  const endpoint = "http://localhost:3000";
  const response = JSON.stringify({ foo: true });

  it("fetcher function use fetch", async () => {
    fetchMock.mockOnce(response);
    await fetchJson(endpoint);

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it("fetcher function use fetch with options", async () => {
    fetchMock.mockOnce(response);
    const requestInit: RequestInit = { mode: "cors" };
    await fetchJson(endpoint, requestInit);

    expect(fetch).toHaveBeenCalledWith(endpoint, requestInit);
  });

  it("fetcher function throw exception when response is not json", async () => {
    fetchMock.mockOnce("Not a json response");

    expect(() => fetchJson(endpoint)).rejects;
  });
});
