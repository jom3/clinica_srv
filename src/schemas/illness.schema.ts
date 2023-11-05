import { z } from "zod";

export const illnessCreateSchema = z.object({
  name:z
  .string({ required_error: "illness name is required" })
  .min(5, { message: "illness name need almost 5 letters" }),
  desc:z
  .string()
  .min(10, { message: "illness description need almost 10 letters" })
  .optional()
});

export const illnessUpdateSchema = z.object({
  name:z
  .string({ required_error: "illness name is required" })
  .min(5, { message: "illness name need almost 5 letters" }),
  desc:z
  .string()
  .min(10, { message: "illness description need almost 10 letters" })
  .optional()
});