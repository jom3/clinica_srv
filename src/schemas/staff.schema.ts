import { z } from "zod";
import { Staff } from "../entities";

export const staffCreateSchema = z.object({
  department_id:z
  .string({ required_error: "department is required" }),
  user_id:z
  .string({ required_error: "user is required" }),
  speciality_id:z
  .string({ required_error: "speciality is required" }),
});

// export const specialityUpdateSchema = z.object({
//   name:z
//   .string({ required_error: "speciality name is required" })
//   .min(5, { message: "speciality name need almost 5 letters" }),
//   desc:z
//   .string()
//   .min(10, { message: "speciality description need almost 10 letters" })
//   .optional()
// });