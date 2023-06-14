import * as yup from "yup";
import { NormalRange } from "../types/ranges";

const fixedRangeSchema = yup
  .array()
  .of(yup.number().required())
  .required()
  .min(3);

export const fixedRangesApiSchema = yup
  .array()
  .of(fixedRangeSchema)
  .required()
  .min(1);

const normalRangeSchema: yup.ObjectSchema<NormalRange> = yup.object({
  max: yup.number().required(),
  min: yup.number().required(),
});

export const normalRangesApiSchema = yup
  .array()
  .of(normalRangeSchema)
  .required()
  .min(1);
