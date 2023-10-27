import { z } from "zod";
import { AppDataSource } from "../config/db.config";
import { User } from "../entities/user.entity";
const userRepository = AppDataSource.getRepository(User);

export const userCreateSchema = z.object({
  firts_name: z
    .string({ required_error: "first name is required" })
    .min(2, { message: "first name need almost 2 letters" }),
  last_name: z
    .string({ required_error: "last name is required" })
    .min(1, { message: "last name need almost 1 letter" }),
  age: z.number({ required_error: "age is required" }),
  gender: z.enum(["Male", "Female"], {
    required_error: "Gender must be Male or Female, you need almost one",
  }),
  birthday: z
    .string({ required_error: "birthday is required" })
    .refine((date) => new Date(date).toString() !== "Invalid date", {
      message: "date is not valid",
    })
    .transform((date) => new Date(date)),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "email format is required - 'example@example.com'" })
    .refine(
      async (val) => {
        const res = await userRepository.findOneBy({ email: val });
        if (!res) return true;
      },
      { message: "email is already exist" }
    ),
  address: z
    .string({ required_error: "address is required" })
    .min(10, { message: "address need almost 10 letters" }),
  telephone: z
    .string({ required_error: "telephone is required" })
    .min(8, { message: "address need almost 10 digits" }),
});

export const userUpdateSchema = z.object({
  firts_name: z
    .string({ required_error: "first name is required" })
    .min(2, { message: "first name need almost 2 letters" }),
  last_name: z
    .string({ required_error: "last name is required" })
    .min(1, { message: "last name need almost 1 letter" }),
  age: z.number({ required_error: "age is required" }),
  gender: z.enum(["Male", "Female"], {
    required_error: "Gender must be Male or Female, you need almost one",
  }),
  birthday: z
    .string({ required_error: "birthday is required" })
    .refine((date) => new Date(date).toString() !== "Invalid date", {
      message: "date is not valid",
    })
    .transform((date) => new Date(date)),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "email format is required - 'example@example.com'" })
    .refine(
      async (val) => {
        const res = await userRepository.findOneBy({ email: val });
        if (!res) return true;
      },
      { message: "email is already exist" }
    )
    .optional(),
  address: z
    .string({ required_error: "address is required" })
    .min(10, { message: "address need almost 10 letters" }),
  telephone: z
    .string({ required_error: "telephone is required" })
    .min(8, { message: "address need almost 10 digits" }),
});
