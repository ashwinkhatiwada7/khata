//1.credit api types
export type CreditItemPayload = {
  name: string;
  qty: string;
  price: string;
};
export type CreateCreditPayload = {
  customerId: string;
  items: CreditItemPayload[];
};
type credit = {
  description: string | null;
  shopOwnerId: string;
  customerId: string;
  id: string;
  createdAt: Date;
  updatedAt: string;
  totalAmount: string;
  entryDate: string;
};

export type CreateCreditResponse = {
  success: boolean;
  message: string;
  data: credit;
};

//2.payment api types
export type CreatePaymentPayload = {
  customerId: string;
  amount: string;
  paymentMethod: string;
  remark?: string;
};

export type payment = {
  amount: string;
  paymentMethod: "cash" | "esewa" | "khatli" | "bank";
  referenceNo: string | null;
  note: string | null;
  shopOwnerId: string;
  customerId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  paymentDate: string;
  createdBy: string;
};

export type CreatePaymentResponse = {
  success: boolean;
  message: string;
  data: payment;
};
