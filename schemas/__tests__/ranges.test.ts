import { ValidationError } from "yup";
import {
  FIXED_RANGES_API_RESPONSE,
  NORMAL_RANGES_API_RESPONSE,
} from "../../__mocks__/ranges";
import { fixedRangesApiSchema, normalRangesApiSchema } from "../ranges";

describe("Schema - Ranges", () => {
  it("validate a correct fixed range response", async () => {
    const response = await fixedRangesApiSchema.validate(
      FIXED_RANGES_API_RESPONSE
    );

    expect(response).toStrictEqual(FIXED_RANGES_API_RESPONSE);
  });

  it("throw error on empty fixed range response", async () => {
    try {
      await fixedRangesApiSchema.validate([]);
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it("throw error on incorrect fixed range response", async () => {
    try {
      await fixedRangesApiSchema.validate([[1, 2]]);
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it("validate a correct normal range response", async () => {
    const response = await normalRangesApiSchema.validate(
      NORMAL_RANGES_API_RESPONSE
    );

    expect(response).toStrictEqual(NORMAL_RANGES_API_RESPONSE);
  });

  it("throw error on empty normal range response", async () => {
    try {
      await normalRangesApiSchema.validate([]);
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });

  it("throw error on incorrect normal range response", async () => {
    try {
      await normalRangesApiSchema.validate([{ max: [2], min: "error" }]);
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationError);
    }
  });
});
