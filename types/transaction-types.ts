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
