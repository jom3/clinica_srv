import { z } from "zod";


export const attentionCreateSchema = z.object({
  user_id:z
  .string({ required_error: "user is required" }),
  room_id:z
  .string({ required_error: "room is required" }),
  staff_id:z
  .string({ required_error: "staff is required" }),
});

export const attentionUpdateSchema = z.object({
  user_id:z
  .string({ required_error: "user is required" }),
  room_id:z
  .string({ required_error: "room is required" }),
  staff_id:z
  .string({ required_error: "staff is required" }),
});