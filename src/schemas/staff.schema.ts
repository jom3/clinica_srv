import { z } from "zod";

export const staffCreateSchema = z.object({
  department_id:z
  .string({ required_error: "department is required" }),
  user_id:z
  .string({ required_error: "user is required" }),
  speciality_id:z
  .string({ required_error: "speciality is required" }),
});

export const staffUpdateSchema = z.object({
  department_id:z
  .string({ required_error: "department is required" }),
  user_id:z
  .string({ required_error: "user is required" }),
  speciality_id:z
  .string({ required_error: "speciality is required" }),
});