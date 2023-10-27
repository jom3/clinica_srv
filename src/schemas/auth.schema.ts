import { z } from "zod";

export const changePasswordSchema = z.object({
    username: z
      .string({ required_error: "username is required" })
      .email({ message: "username format is required - 'example@example.com'" }),
    password: z.string({ required_error: "password is required" }),
    confirmedPassword: z.string({
      required_error: "same password is required to confirm",
    }),
  }).refine((data) => data.password === data.confirmedPassword, {
    message: "passwords don't match",
    path: ["confirm"],
  });

  export const loginSchema = z.object({
    username: z
      .string({ required_error: "username is required" })
      .email({ message: "username format is required - 'example@example.com'" }),
    password: z.string({ required_error: "password is required" })
  })

  export const recoverSchema = z.object({
    username: z
      .string({ required_error: "username is required" })
  })

