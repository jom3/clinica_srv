import { z } from "zod";

export const departmentCreateSchema = z.object({
  name:z
  .string({ required_error: "department name is required" })
  .min(5, { message: "department name need almost 5 letters" }),
  desc:z
  .string()
  .min(10, { message: "department description need almost 10 letters" })
  .optional()
});

export const departmentUpdateSchema = z.object({
  name:z
  .string({ required_error: "department name is required" })
  .min(5, { message: "department name need almost 5 letters" }),
  desc:z
  .string()
  .min(10, { message: "department description need almost 10 letters" })
  .optional()
});