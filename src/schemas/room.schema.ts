import { z } from "zod";

export const roomCreateSchema = z.object({
  name:z
  .string({ required_error: "room name is required" })
  .min(5, { message: "room name need almost 5 letters" }),
  desc:z
  .string()
  .optional()
});

export const roomUpdateSchema = z.object({
  name:z
  .string({ required_error: "room name is required" })
  .min(5, { message: "room name need almost 5 letters" }),
  desc:z
  .string()
  .optional()
});