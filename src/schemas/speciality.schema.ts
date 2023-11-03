import { z } from "zod";

export const specialityCreateSchema = z.object({
  name:z
  .string({ required_error: "speciality name is required" })
  .min(5, { message: "speciality name need almost 5 letters" }),
  desc:z
  .string()
  .min(10, { message: "speciality description need almost 10 letters" })
  .optional()
});

export const specialityUpdateSchema = z.object({
  name:z
  .string({ required_error: "speciality name is required" })
  .min(5, { message: "speciality name need almost 5 letters" }),
  desc:z
  .string()
  .min(10, { message: "speciality description need almost 10 letters" })
  .optional()
});