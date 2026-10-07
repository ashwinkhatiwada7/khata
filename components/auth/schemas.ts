import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z
    .string()
    .min(3, "Password is required")
    .max(15, "Maximum 15 characters are allowed"),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Enter the owner's full name"),
    phone: z.string().regex(/^\d{10}$/, "Enter a 10-digit phone number"),
    email: z.email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Minimum 8 characters")
      .max(15, "Maximum 15 characters"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((v) => v, "You must accept the terms"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
export type SignupValueType = z.infer<typeof signupSchema>;
export const signupDefaultValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: false,
};
