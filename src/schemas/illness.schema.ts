import { z } from "zod";

export const illnessCreateSchema = z.object({
  name:z
  .string({ required_error: "illness name is required" })
  .min(5, { message: "illness name need almost 5 letters" }),
  desc:z
  .string()
  .optional()
});

export const illnessUpdateSchema = z.object({
  name:z
  .string({ required_error: "illness name is required" })
  .min(5, { message: "illness name need almost 5 letters" }),
  desc:z
  .string()
  .optional()
});