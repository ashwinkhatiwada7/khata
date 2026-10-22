import z from "zod";

export const balanceSchema = z
  .string()
  .regex(
    /^\d+(\.\d{1,2})?$/,
    "Credit limit must be a valid number with up to 2 decimal places",
  )
  .refine((val) => parseFloat(val) >= 0, {
    message: "Credit limit must be non-negative",
  })
  .refine((val) => parseFloat(val) <= 999999999.99, {
    message: "Credit limit exceeds maximum allowed value",
  });

export const createCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, "Minimum 4 characters")
    .max(60, "Maximum 60 characters"),
  address: z
    .string()
    .trim()
    .min(4, "Minimum 4 character")
    .max(60, "Maximum 60 character"),
  creditLimit: balanceSchema,
  //   creditBalance: balanceSchema,
  //   isActive: z.boolean("is_active").default(true),
  //   image: z.string().trim().optional(),
  phone: z.string().regex(/^\d{10}$/, "Phone must be of 10 digits"),
});

export type createCustomerType = z.infer<typeof createCustomerSchema>;
export const createCustomerDefaultValues = {
  name: "",
  phone: "",
  address: "",
  creditLimit: "",
};
