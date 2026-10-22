import { api } from "@/lib/client";
import {
  CreateCustomer,
  CreateCustomerPayload,
  GetAllCustomer,
  GetCustomerById,
  GetCustomerByIdPayload,
  GetCustomerTransactions,
  GetCustomerTransactionsPayload,
  UpdateCustomer,
  UpdateCustomerPayload,
} from "@/types/customer-types";

export async function getAllCustomer(
  page = 1,
  perpage = 20,
  search = "",
): Promise<GetAllCustomer> {
  const res = await api.get<GetAllCustomer>("/customer", {
    params: { page, perpage, search },
  });

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
  await new Promise((r) => setTimeout(r, 3000));
  const res = await api.get<GetCustomerById>(`/customer/${payload.customerId}`);

  return res.data;
}

export async function getCustomerTransactions({
  customerId,
  from,
  to,
}: GetCustomerTransactionsPayload) {
  await new Promise((r) => setTimeout(r, 5000));
  const res = await api.get<GetCustomerTransactions>(
    `/customer/${customerId}/transactions`,
    { params: { from, to } }, // undefined params are omitted by axios
  );

  return res.data;
}

export async function updateCustomer(payload: UpdateCustomerPayload) {
  const res = await api.patch<UpdateCustomer>(
    `/customer/${payload.customerId}`,
    {
      name: payload.name,
      address: payload.address,
      phone: payload.phone,
      creditLimit: payload.creditLimit,
    },
  );

  return res.data;
}
