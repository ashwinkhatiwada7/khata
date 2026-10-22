import { ApiSuccessResponse } from "./api-response-type";

//1. get customer types
export type Customer = {
  id: string;
  name: string;
  shopOwnerId: string;
  phone: string;
  address: string;
  creditLimit: string;
  creditBalance: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
};

export type PaginationMeta = {
  page: number;
  perpage: number;
  total: number;
  totalPages: number;
};

export type GetAllCustomer = ApiSuccessResponse<Customer[], PaginationMeta>;

//2. create customer types
export type CreateCustomerPayload = {
  name: string;
  address: string;
  creditLimit: string;
  phone: string;
  image?: string;
};

export type CreateCustomer = ApiSuccessResponse<
  Omit<
    Customer,
    | "shopOwnerId"
    | "address"
    | "creditLimit"
    | "creditBalance"
    | "isActive"
    | "createdAt"
    | "updatedAt"
  >[]
>;

//3. getcustomerBy id

export type GetCustomerByIdPayload = {
  customerId: string;
};

export type GetCustomerById = ApiSuccessResponse<Customer>;

//4. get customer transactions
export type CustomerTransaction = {
  id: string;
  date: string;
  type: "credit" | "payment";
  note: string | null;
  amount: string;
  balance: string;
};

// ISO dates (YYYY-MM-DD); backend allows a range of at most 2 months
export type GetCustomerTransactionsPayload = {
  customerId: string;
  from?: string;
  to?: string;
};

export type GetCustomerTransactions = ApiSuccessResponse<CustomerTransaction[]>;
