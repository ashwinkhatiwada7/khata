import { api } from "@/lib/client";
import {
  CreateCustomer,
  CreateCustomerPayload,
  GetAllCustomer,
  GetCustomerById,
  GetCustomerByIdPayload,
  GetCustomerTransactions,
  GetCustomerTransactionsPayload,
} from "@/types/customer-types";

export async function getAllCustomer(
  page = 1,
  perpage = 20,
  search = "",
): Promise<GetAllCustomer> {
  const res = await api.get<GetAllCustomer>("/customer", {
    params: { page, perpage, search },
  });
  // console.log(res.data);
  return res.data;
}

export async function createCustomer(
  payload: CreateCustomerPayload,
): Promise<CreateCustomer> {
  const res = await api.post<CreateCustomer>("/customer", {
    ...payload,
  });

  return res.data;
}

export async function getCustomerById(payload: GetCustomerByIdPayload) {
  const res = await api.get<GetCustomerById>(`/customer/${payload.customerId}`);

  return res.data;
}

export async function getCustomerTransactions({
  customerId,
  from,
  to,
}: GetCustomerTransactionsPayload) {
  const res = await api.get<GetCustomerTransactions>(
    `/customer/${customerId}/transactions`,
    { params: { from, to } }, // undefined params are omitted by axios
  );

  return res.data;
}
