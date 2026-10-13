import { Customer } from "@/types/customer-types";
import type { DefaultValues } from "react-hook-form";
import z from "zod";

const moneyString = (opts: {
  label: string;
  allowZero?: boolean;
  max?: number;
}) =>
  z
    .string()
    .trim()
    .min(1, `${opts.label} is required`)
    .regex(/^\d+(\.\d{1,2})?$/, "Enter a valid number (max 2 decimals)")
    .refine(
      (v) => (opts.allowZero ? Number(v) >= 0 : Number(v) > 0),
      "Must be greater than 0",
    )
    .refine(
      (v) => Number(v) <= (opts.max ?? 10_000_000),
      "That amount is too large",
    );
//1. customer schema
export const customerSchema = z.object({
  customer: z.custom<Customer>(
    (c) => typeof c === "object" && c != null && "id" in c,
    "Select a customer",
  ),
});
export type customerSchemaType = z.infer<typeof customerSchema>;

export const customerSchemaDefaultValues = {
  customer: null as Customer | null,
};

export const customerSchemaFieldKeys = Object.keys(
  customerSchema.shape,
) as (keyof customerSchemaType)[];

//2.type schema
export const typeSchema = z.object({
  type: z.enum(["credit", "payment"], { error: "Choose Credit or Payment" }),
});
export type typeSchemaType = z.infer<typeof typeSchema>;

export const typeSchemaDefaultValues = {
  type: null as "credit" | "payment" | null,
};

export const typeSchemaFieldKeys = Object.keys(
  typeSchema.shape,
) as (keyof typeSchemaType)[];

//3. payment schema
export const PAYMENT_METHODS = ["cash", "bank", "esewa", "khalti"];
export const paymentFormSchema = z.object({
  amount: moneyString({ label: "Rs", allowZero: false }),
  paymentMethod: z.enum(PAYMENT_METHODS).default("cash"),
  remark: z.string().trim().max(100, "Maximum 100 Characters"),
});
export type paymentFormSchemaType = z.infer<typeof paymentFormSchema>;

export const paymentFormSchemaDefaultValues = {
  amount: "",
  paymentMethod: "cash",
  remark: "",
};

export const paymentFormSchemaFieldKeys = Object.keys(
  paymentFormSchema.shape,
) as (keyof paymentFormSchemaType)[];

//4. credit schema

export const CredititemsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Item name is required")
    .max(60, "Max 60 characters"),
  qty: z
    .string()
    .trim()
    .min(1, "Qty is required")
    .regex(/^\d+(\.\d{1,3})?$/, "Invalid qty")
    .refine((v) => Number(v) > 0, "Must be > 0")
    .refine((v) => Number(v) <= 100_000, "Too large"),
  price: moneyString({ label: "Price", allowZero: false }),
});
export type CredititemsSchemaType = z.infer<typeof CredititemsSchema>;

export const CreditSchema = z.object({
  items: z
    .array(CredititemsSchema)
    .min(1, "Add at least one item")
    .max(50, " Too many items max(50)allowed"),
});
export type CreditSchemaType = z.infer<typeof CreditSchema>;

export const EMPTY_CREDIT_ITEM: CredititemsSchemaType = {
  name: "",
  qty: "",
  price: "",
};

export const CreditSchemaDefaultValues = {
  items: [] as CredititemsSchemaType[],
};

export const CreditSchemaFieldKeys = Object.keys(
  CreditSchema.shape,
) as (keyof CreditSchemaType)[];

//5. transaction schema (whole form = all steps combined)
export const transactionSchema = customerSchema
  .extend(typeSchema.shape)
  // loose shapes: the branch not chosen is allowed to stay empty
  .extend({
    amount: z.string(),
    paymentMethod: z.string(),
    remark: z.string().optional(),
    items: z.array(
      z.object({ name: z.string(), qty: z.string(), price: z.string() }),
    ),
  })
  // validate ONLY the branch for the chosen type; forward its issues
  .superRefine((v, ctx) => {
    const branch = v.type === "payment" ? paymentFormSchema : CreditSchema;
    const res = branch.safeParse(v);
    if (res.success) return;
    for (const issue of res.error.issues) {
      ctx.addIssue({
        code: "custom",
        path: issue.path,
        message: issue.message,
      });
    }
  });
export type transactionSchemaType = z.infer<typeof transactionSchema>;

export const transactionSchemaDefaultValues = {
  ...customerSchemaDefaultValues,
  ...typeSchemaDefaultValues,
  ...paymentFormSchemaDefaultValues,
  ...CreditSchemaDefaultValues,
} as DefaultValues<transactionSchemaType>;

export const transactionSchemaFieldKeys = Object.keys(
  transactionSchema.shape,
) as (keyof transactionSchemaType)[];

//helper: line total for a credit item row
export const rowTotal = (r?: { qty: string; price: string }) =>
  Number(r?.qty || 0) * Number(r?.price || 0);
